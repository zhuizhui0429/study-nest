import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { CreateFilesUploadDto } from './dto/create-files-upload.dto';
import { UpdateFilesUploadDto } from './dto/update-files-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
@Controller('file')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: CreateFilesUploadDto) {
    console.log('即将上传的文件', file);
    return file;
  }
  @Post('upload-files')
  @UseInterceptors(FilesInterceptor('files'))
  createMany(@UploadedFiles() files: CreateFilesUploadDto[]) {
    console.log('批量上传的文件～', files);
  }
  @Get()
  findAll() {
    return this.filesUploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesUploadService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFilesUploadDto: UpdateFilesUploadDto,
  ) {
    return this.filesUploadService.update(+id, updateFilesUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesUploadService.remove(+id);
  }
}
