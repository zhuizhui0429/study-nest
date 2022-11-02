import { PartialType } from '@nestjs/swagger';
import { CreateFilesUploadDto } from './create-files-upload.dto';

export class UpdateFilesUploadDto extends PartialType(CreateFilesUploadDto) {}
