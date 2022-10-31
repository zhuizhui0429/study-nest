import { Module } from '@nestjs/common';
import { CatsService, serviceObj } from './cats.service';
import { Cat } from './interfaces/cats';
import { CatsController } from './cats.controller';
const mockCatService: CatsService = {
  cats: [],
  create(cat: Cat) {
    console.log('mock create exec');
    this.cats.push(cat);
  },
  findAll() {
    console.log('mock findAll exec');
    return this.cats;
  },
};
@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useValue: mockCatService,
    },
    {
      provide: 'test',
      useValue: serviceObj,
    },
  ],
  exports: [CatsService], //导出一些service供import当前module的其他module共享相同的service实例
})
export class CatsModule {}
