import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { FileSystemService } from 'src/file-system/file-system.service';

@Injectable()
export class RequestsService {
  private data: Request[] = [];
  private queue: Promise<void> = Promise.resolve();
  constructor(private readonly fileSystemService: FileSystemService) {
    this.initData();
  }

  private async initData() {
    try {
      this.data = await this.fileSystemService.readData();
    } catch (error) {
      console.error('Error loading data from file:', error);
      throw new InternalServerErrorException('Failed to load data');
    }
  }

  async create(createRequestDto: CreateRequestDto) {
    return this.addToQueue(async () => {
      const existingIndex = this.data.findIndex(
        (c) => c.id === createRequestDto.id,
      );
      if (existingIndex !== -1) {
        throw new BadRequestException('Request already exists');
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

  findOne(id: string) {
    let request = this.data.find((req) => req.id === id);
    if (!request)
      throw new NotFoundException(`Request with id ${id} not found`);
    return request;
  }

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    return this.addToQueue(async () => {
      const index = this.data.findIndex((req) => req.id === id);
      if (index === -1) {
        throw new NotFoundException(`Request with id ${id} not found`);
      }

      this.data[index] = { ...this.data[index], ...updateRequestDto };

      await this.fileSystemService.writeData(this.data);
      return {
        message: 'Request updated successfully',
        data: this.data[index],
      };
    });
  }

  async remove(id: string) {
    return this.addToQueue(async () => {
      const index = this.data.findIndex((req) => req.id === id);
      if (index === -1) {
        throw new NotFoundException(`Request with id ${id} not found`);
      }

      this.data.splice(index, 1);
      await this.fileSystemService.writeData(this.data);
      return {
        message: `Request with id ${id} has been removed successfully`,
      };
    });
  }

  async complete(id: string) {
    return this.addToQueue(async () => {
      const index = this.data.findIndex((req) => req.id === id);
      if (index === -1) {
        throw new NotFoundException(`Request with id ${id} not found`);
      }
      if (this.data[index].status === 'completed') {
        throw new ConflictException('Already marked complete');
      }

      this.data[index].status = 'completed';

      await this.fileSystemService.writeData(this.data);

      return {
        message: 'Request marked complete',
        data: this.data[index],
      };
    });
  }

  private async addToQueue(operation: () => Promise<any>) {
    this.queue = this.queue.then(() =>
      operation().catch((error) => {
        console.error('Error in queued operation:', error);
        throw error;
      }),
    );

    return this.queue;
  }
}
