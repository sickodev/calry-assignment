import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestsModule } from './requests/requests.module';
import { FileSystemService } from './file-system/file-system.service';
import { FileSystemModule } from './file-system/file-system.module';

@Module({
  controllers: [AppController],
  providers: [AppService, FileSystemService],
  imports: [RequestsModule, FileSystemModule],
})
export class AppModule {}
