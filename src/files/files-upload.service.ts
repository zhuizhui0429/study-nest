import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
@Injectable()
export class FilesUploadService {
  constructor(
    @InjectRepository(File) private FileRepository: Repository<File>,
  ) {}
  async create(...files: (Express.Multer.File & Record<'url', string>)[]) {
    return await this.FileRepository.save(
      files.map((file) => {
        const { originalname, size, url } = file;
        const index = originalname.lastIndexOf('.');
        return {
          fileName: originalname.slice(0, index),
          type: originalname.slice(index + 1),
          size,
          url,
          uid: Math.random().toString(),
        };
      }),
    );
  }

  findAll() {
    return `This action returns all filesUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filesUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} filesUpload`;
  }
}
