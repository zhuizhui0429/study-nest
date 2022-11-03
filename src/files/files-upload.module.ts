import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { FilesUploadController } from './files-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { File } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { getRandomFileName } from '../utils/file';
const acceptMimeTypes = ['image', 'video'];
@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      fileFilter(req, file, cb) {
        const type = file.mimetype.split('/')[0];
        if (!acceptMimeTypes.includes(type)) {
          cb(
            new Error(
              `暂不支持${file.originalname.slice(
                file.originalname.lastIndexOf('.') + 1,
              )}类型的文件`,
            ),
            false,
          );
          return;
        }
        // 解决中文名乱码的问题 latin1 是一种编码格式
        file.originalname = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        );
        cb(null, true);
      },
      storage: diskStorage({
        //destination为函数时，需要手动创建相应的目录
        destination(
          req,
          file: Express.Multer.File & Record<'assetType', string>,
          cb,
        ) {
          const { mimetype } = file;
          const type = mimetype.split('/')[0];
          const rootDir = join(__dirname, '..', '..', 'assets');
          let assetType = '';
          let finalDir = '';
          switch (type) {
            case 'image':
              assetType = 'images';
              break;
            case 'video':
              assetType = 'videos';
              break;
            default:
              assetType = 'files';
          }
          finalDir = join(rootDir, assetType);
          file.assetType = assetType;
          cb(null, finalDir);
        },
        filename(
          req,
          file: Express.Multer.File & Record<'url' | 'assetType', string>,
          cb,
        ) {
          const { originalname } = file;
          const name = getRandomFileName(originalname);
          file.url = `http://localhost:3000/assets/${file.assetType}/${name}`;
          cb(null, name);
        },
      }),
    }),
  ],
  controllers: [FilesUploadController],
  providers: [FilesUploadService],
})
export class FilesUploadModule {}
