"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const request_entity_1 = require("../entities/request.entity");
class CreateRequestDto extends (0, mapped_types_1.PickType)(request_entity_1.Request, [
    'id',
    'guestName',
    'roomNumber',
    'requestDetails',
    'priority',
    'status',
]) {
}
exports.CreateRequestDto = CreateRequestDto;
//# sourceMappingURL=create-request.dto.js.map