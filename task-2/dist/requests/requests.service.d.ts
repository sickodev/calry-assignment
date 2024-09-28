import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { FileSystemService } from 'src/file-system/file-system.service';
export declare class RequestsService {
    private readonly fileSystemService;
    private data;
    private queue;
    constructor(fileSystemService: FileSystemService);
    private initData;
    create(createRequestDto: CreateRequestDto): Promise<void>;
    findAll(): Request[];
    findOne(id: string): Request;
    update(id: string, updateRequestDto: UpdateRequestDto): Promise<void>;
    remove(id: string): Promise<void>;
    complete(id: string): Promise<void>;
    private addToQueue;
}
