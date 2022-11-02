import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { FilesUploadController } from './files-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //destination为函数时，需要手动创建相应的目录
        destination(req, file, cb) {
          const { mimetype } = file;
          const type = mimetype.split('/')[0];
          const rootDir = join(__dirname, '..', '..', 'assets');
          let finalDir = '';
          switch (type) {
            case 'image':
              finalDir = join(rootDir, 'images');
              break;
            case 'video':
              finalDir = join(rootDir, 'videos');
              break;
            default:
              finalDir = join(rootDir, 'files');
          }
          cb(null, finalDir);
        },
        filename(req, file, cb) {
          const { originalname } = file;
          const index = originalname.lastIndexOf('.');
          const fileName = originalname.slice(0, index);
          const filetype = originalname.slice(index + 1);
          const name = `${fileName}-${Math.random()
            .toString(36)
            .slice(-8)}.${filetype}`;
          cb(null, name);
        },
      }),
    }),
  ],
  controllers: [FilesUploadController],
  providers: [FilesUploadService],
})
export class FilesUploadModule {}
