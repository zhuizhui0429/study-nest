import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
@Controller()
export class AppController {
  constructor(
    //构造里里面的service声明顺序无所谓(nest通过ts类型去管理依赖),只要保证当前module能引用到对应的service即可
    private readonly catService: CatsService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/share')
  testShare(): string {
    console.log('findAll', this.catService.findAll());
    return 'share!!';
  }
}
