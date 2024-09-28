import { PickType } from '@nestjs/mapped-types';
import { Request } from '../entities/request.entity';

export class CreateRequestDto extends PickType(Request, [
  'id',
  'guestName',
  'roomNumber',
  'requestDetails',
  'priority',
  'status',
]) {}
