import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';

import { FilesUploadModule } from './files/files-upload.module';
import { entries } from './entries';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      entities: entries, // 数据表实体
      host: 'localhost', // 主机，默认为localhost
      port: 3306, // 端口号
      username: 'root', // 用户名
      password: 'zzxcxy666', // 密码
      database: '博客DB', //数据库名
      synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
      autoLoadEntities: false, // 所有module中通过TypeOrmModule.feature注册的实体都会自动导入
      retryAttempts: 1,
    }),
    CatsModule,
    UserModule,
    FilesUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
