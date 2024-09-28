import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import path, { join } from 'path';
import { Request } from 'src/requests/entities/request.entity';



@Injectable()
export class FileSystemService {
  private readonly filePath: string

  constructor(){
    this.filePath = join(process.cwd(), "data.json")
  }

  async readData(): Promise<Request[]>{
    try{
      const data = await promises.readFile(this.filePath, 'utf-8')
      return JSON.parse(data) || []
    }catch (err){
      if(err.code === 'ENOENT'){
        return []
      }
      throw err;
    }
  }

  async writeData(data:Request[]): Promise<void>{
    await promises.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8')
  }
}
