import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, PrimaryColumn } from 'typeorm';
import { bcrypt } from 'bcryptjs';
export class User {
  @PrimaryColumn('uuid')
  id: string;
  @ApiProperty({ description: '用户名称' })
  @Column({ length: 100 })
  username: string;
  @ApiProperty({ description: '登陆密码' })
  @Column({ length: 20 })
  password: string;
  @ApiProperty({ description: '用户图像的url地址' })
  @Column({ length: 255 })
  avatar: string;
  @ApiProperty({ description: '用户邮箱' })
  @Column({ length: 100 })
  email: string;
  @ApiProperty({ description: '用户的权限' })
  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string;
  @ApiProperty({ description: '用户注册时间' })
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: string;
  @ApiProperty({ description: '用户信息上次更新时间' })
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: string;
  @BeforeInsert()
  async encryptPwd() {
    this.password = await bcrypt.hashSync(this.password);
  }
}
