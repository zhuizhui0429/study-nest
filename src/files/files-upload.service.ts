import { Injectable } from '@nestjs/common';
import { CreateFilesUploadDto } from './dto/create-files-upload.dto';
import { UpdateFilesUploadDto } from './dto/update-files-upload.dto';

@Injectable()
export class FilesUploadService {
  create(createFilesUploadDto: CreateFilesUploadDto) {
    return 'This action adds a new filesUpload';
  }

  findAll() {
    return `This action returns all filesUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filesUpload`;
  }

  update(id: number, updateFilesUploadDto: UpdateFilesUploadDto) {
    return `This action updates a #${id} filesUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} filesUpload`;
  }
}
