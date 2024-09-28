import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
export declare class RequestsController {
    private readonly requestsService;
    constructor(requestsService: RequestsService);
    create(createRequestDto: CreateRequestDto): Promise<void>;
    findAll(): import("./entities/request.entity").Request[];
    findOne(id: string): import("./entities/request.entity").Request;
    update(id: string, updateRequestDto: UpdateRequestDto): Promise<void>;
    remove(id: string): Promise<void>;
    complete(id: string): Promise<void>;
}
