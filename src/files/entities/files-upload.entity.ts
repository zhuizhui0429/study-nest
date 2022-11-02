import { Column, PrimaryColumn } from 'typeorm';
export class FilesUpload {
  @PrimaryColumn('uuid')
  uid: string;
  @Column({ length: 255 })
  fileName: string;
  @Column()
  size: number;
  @Column({ length: '255' })
  type: string;
}
