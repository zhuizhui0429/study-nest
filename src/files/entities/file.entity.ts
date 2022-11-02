import { Column, PrimaryColumn, Entity } from 'typeorm';
@Entity()
export class File {
  @PrimaryColumn('uuid')
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
