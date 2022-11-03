import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
@Entity()
export class File {
  /**
   * 主键自动生成uuid字符串
   */
  @PrimaryGeneratedColumn('uuid')
  uid: string;
  @Column({ length: 255 })
  fileName: string;
  @Column()
  size: number;
  @Column({ length: 255 })
  type: string;
  @Column({ length: 255 })
  url: string;
}
