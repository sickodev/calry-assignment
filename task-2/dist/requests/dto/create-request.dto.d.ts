import { Request } from '../entities/request.entity';
declare const CreateRequestDto_base: import("@nestjs/mapped-types").MappedType<Pick<Request, "id" | "guestName" | "roomNumber" | "requestDetails" | "priority" | "status">>;
export declare class CreateRequestDto extends CreateRequestDto_base {
}
export {};
