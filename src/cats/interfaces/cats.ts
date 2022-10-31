import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty({ description: '猫的ID' })
  id: number;
  @ApiProperty({ description: '猫的名称' })
  name: string;
  @ApiProperty({ description: '猫的年龄' })
  age: number;
  @ApiProperty({ description: '猫的品种' })
  breed: string;
}
