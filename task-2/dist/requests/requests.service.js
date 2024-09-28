"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const file_system_service_1 = require("../file-system/file-system.service");
let RequestsService = class RequestsService {
    constructor(fileSystemService) {
        this.fileSystemService = fileSystemService;
        this.data = [];
        this.queue = Promise.resolve();
        this.initData();
    }
    async initData() {
        try {
            this.data = await this.fileSystemService.readData();
        }
        catch (error) {
            console.error('Error loading data from file:', error);
            throw new common_1.InternalServerErrorException('Failed to load data');
        }
    }
    async create(createRequestDto) {
        return this.addToQueue(async () => {
            const existingIndex = this.data.findIndex((c) => c.id === createRequestDto.id);
            if (existingIndex !== -1) {
                throw new common_1.BadRequestException('Request already exists');
            }
            this.data.push(createRequestDto);
            await this.fileSystemService.writeData(this.data);
            return {
                message: 'Request added successfully',
                data: createRequestDto,
            };
        });
    }
    findAll() {
        this.data.sort((a, b) => {
            if (a.status === 'completed' && b.status !== 'completed') {
                return 1;
            }
            if (a.status !== 'completed' && b.status === 'completed') {
                return -1;
            }
            return a.priority - b.priority;
        });
        return this.data;
    }
    findOne(id) {
        let request = this.data.find((req) => req.id === id);
        if (!request)
            throw new common_1.NotFoundException(`Request with id ${id} not found`);
        return request;
    }
    async update(id, updateRequestDto) {
        return this.addToQueue(async () => {
            const index = this.data.findIndex((req) => req.id === id);
            if (index === -1) {
                throw new common_1.NotFoundException(`Request with id ${id} not found`);
            }
            this.data[index] = { ...this.data[index], ...updateRequestDto };
            await this.fileSystemService.writeData(this.data);
            return {
                message: 'Request updated successfully',
                data: this.data[index],
            };
        });
    }
    async remove(id) {
        return this.addToQueue(async () => {
            const index = this.data.findIndex((req) => req.id === id);
            if (index === -1) {
                throw new common_1.NotFoundException(`Request with id ${id} not found`);
            }
            this.data.splice(index, 1);
            await this.fileSystemService.writeData(this.data);
            return {
                message: `Request with id ${id} has been removed successfully`,
            };
        });
    }
    async complete(id) {
        return this.addToQueue(async () => {
            const index = this.data.findIndex((req) => req.id === id);
            if (index === -1) {
                throw new common_1.NotFoundException(`Request with id ${id} not found`);
            }
            if (this.data[index].status === 'completed') {
                throw new common_1.ConflictException('Already marked complete');
            }
            this.data[index].status = 'completed';
            await this.fileSystemService.writeData(this.data);
            return {
                message: 'Request marked complete',
                data: this.data[index],
            };
        });
    }
    async addToQueue(operation) {
        this.queue = this.queue.then(() => operation().catch((error) => {
            console.error('Error in queued operation:', error);
            throw error;
        }));
        return this.queue;
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_system_service_1.FileSystemService])
], RequestsService);
//# sourceMappingURL=requests.service.js.map