import { Request } from 'src/requests/entities/request.entity';
export declare class FileSystemService {
    private readonly filePath;
    constructor();
    readData(): Promise<Request[]>;
    writeData(data: Request[]): Promise<void>;
}
