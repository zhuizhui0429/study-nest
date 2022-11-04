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
  Body,
  Req,
} from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as multiparty from 'multiparty';
import { join } from 'path';
import * as fse from 'fs-extra';
import {
  createWriteStream,
  createReadStream,
  existsSync,
  unlinkSync,
  rmdirSync,
} from 'fs';
import { getFileExt, getStorageType } from '../utils/file';
const SLICE_UPLOAD_DIR = join(__dirname, '..', '..', 'slice-upload');
const CHUNKS_PREFIX = 'chunks-of-';
type mergeInfo = {
  chunkSize: number;
  fileName: string;
  /**
   * 文件内容hash
   */
  hash: string;
  mimeType: string;
};
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
  @Get('findAll')
  @SetMetadata('successMessage', '获取所有文件资源成功～')
  async findAll() {
    const res = await this.filesUploadService.findAll();
    return res;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesUploadService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesUploadService.remove(+id);
  }
  @Post('slice-upload')
  @SetMetadata('notNeedLogger', true)
  async sliceUpload(@Req() req) {
    const form = new multiparty.Form();
    let num = 0;
    const pro = new Promise((resolve) => {
      form.parse(req, async (err, fields, files) => {
        if (err) {
          throw new Error(err.message);
        }
        const [hash] = fields.hash;
        const [file] = files.file;
        num = Number(hash.split('-')[1]);
        const cur_slice_dir = join(
          SLICE_UPLOAD_DIR,
          `${CHUNKS_PREFIX}${hash.split('-')[0]}`,
        );
        if (!fse.existsSync(cur_slice_dir)) {
          await fse.mkdirs(cur_slice_dir);
        }
        await fse.move(file.path, `${cur_slice_dir}/${hash}`);
        resolve(true);
      });
    });
    await pro;
    return `切片${num}上传完毕`;
  }
  @Post('slice-merge')
  async mergeSlice(@Body() mergeInfo: mergeInfo) {
    const { chunkSize, fileName, hash, mimeType } = mergeInfo;
    const chunksPath = join(SLICE_UPLOAD_DIR, `${CHUNKS_PREFIX}${hash}`);
    const targetFilePath = join(
      __dirname,
      '..',
      '..',
      'assets',
      getStorageType(mimeType),
      `${hash}.${getFileExt(fileName)}`,
    );
    await mergeFileChunks(chunksPath, targetFilePath, chunkSize);
    return '文件切片合并成功';
  }
  @Post('verify-should-upload')
  async verifyShouldUpload(
    @Body('hash') hash: string,
    @Body('mimeType') mimeType: string,
    @Body('fileName') fileName: string,
  ) {
    const name = `${hash}.${getFileExt(fileName)}`;
    // 存储资源的path
    const dirPath = join(
      __dirname,
      '..',
      '..',
      'assets',
      getStorageType(mimeType),
    );
    // 存储切片的path
    const slicePath = join(
      __dirname,
      '..',
      '..',
      'slice-upload',
      `chunks-of-${hash}`,
    );
    if (existsSync(join(dirPath, name))) {
      return {
        shouldUpload: false,
        uploadedFilesHash: [],
      };
    }
    const uploadedFilesHash = existsSync(slicePath)
      ? await fse.readdir(slicePath)
      : [];
    return {
      shouldUpload: true,
      uploadedFilesHash: uploadedFilesHash,
    };
  }
}
async function mergeFileChunks(
  chunksPath: string,
  targetStoragePath: string,
  chunkSize: number,
) {
  const chunkPaths = await fse.readdir(chunksPath);
  chunkPaths.sort(
    (left: string, right: string) =>
      Number(left.split('-')[1]) - Number(right.split('-')[1]),
  );
  await chunkPaths.map(
    (path, index) =>
      new Promise((resolve) => {
        const readStream = createReadStream(join(chunksPath, path));
        const writeStream = createWriteStream(targetStoragePath, {
          start: index * chunkSize,
        });
        readStream.on('end', () => {
          existsSync(path) && unlinkSync(path);
          resolve('当前分片已经合并');
        });
        readStream.pipe(writeStream);
      }),
  );
  fse.emptyDir(chunksPath).then(() => {
    rmdirSync(chunksPath);
  });
  console.log('文件合并成功');
}
