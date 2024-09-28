import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { FileSystemModule } from 'src/file-system/file-system.module';

@Module({
  imports:[FileSystemModule],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
