import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cats';
@Injectable()
export class CatsService {
  readonly cats: Cat[] = [
    {
      id: 1,
      name: '小布',
      age: 1,
      breed: '布偶',
    },
    {
      id: 2,
      name: '小矮',
      age: 2,
      breed: '矮脚猫',
    },
  ];
  create(cat: Cat) {
    this.cats.push(cat);
  }
  findAll() {
    return this.cats;
  }
  // findCatById(id: number) {
  //   return this.cats.find((cat) => cat.id == id);
  // }
}
export interface testService {
  printf(): string;
}

export const serviceObj: testService = {
  printf() {
    return '测试一下string token的provider';
  },
};
