import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  SetMetadata,
} from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
@Controller('file')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @SetMetadata('successMessage', '单个文件上传成功～ ')
  async create(
    @UploadedFile() file: Express.Multer.File & Record<'url', string>,
  ) {
    const res = await this.filesUploadService.create(file);
    return res;
  }
  @Post('upload-files')
  @UseInterceptors(FilesInterceptor('files'))
  @SetMetadata('successMessage', '文件批量上传成功~')
  async createMany(
    @UploadedFiles() files: (Express.Multer.File & Record<'url', string>)[],
  ) {
    const res = await this.filesUploadService.create(...files);
    return res;
  }
  @Get()
  findAll() {
    return this.filesUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesUploadService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesUploadService.remove(+id);
  }
}
