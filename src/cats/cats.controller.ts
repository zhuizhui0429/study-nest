import {
  Controller,
  Get,
  Post,
  Header,
  HttpException,
  HttpStatus,
  Body,
  UseGuards,
  SetMetadata,
  Inject,
} from '@nestjs/common';
import { CatsService, testService } from './cats.service';
import { Cat } from './interfaces/cats';
import { CreateCatPipe } from './pipes';
import { CatGuard } from './guards/catGuard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('cats')
@ApiTags('cats') // swagger分类tag名称
@UseGuards(CatGuard)
export class CatsController {
  constructor(
    @Inject('test') testService: testService,
    private CatService: CatsService,
  ) {}
  @Post('/createCat')
  @SetMetadata('roles', ['admin']) //只要命中该请求路由,本次请求cycle中会添加元数据,元数据可以在guard中通过reflector获取
  @ApiOperation({ description: '创建一只猫' })
  // 使用CreateCatPipe校验请求体是否符合猫的数据格式
  createCat(@Body(CreateCatPipe) cat: Cat) {
    this.CatService.create(cat);
  }
  @Get('/findAll')
  @Header('myName', 'zzx')
  findAll() {
    console.log('接收到了请求,findAll');
    return this.CatService.findAll();
  }
  @Get('/feedCat')
  feedCat() {
    if (Math.random() > 0.5) {
      return '可以喂猫';
    } else {
      // throw new BadRequestException();
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: '猫生气咯,禁止',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  @Get('/test')
  test() {
    return;
  }
  // @Get('/findCat/:id')
  // findCat(@Param('id', ParseIntPipe) id: number) {
  //   console.log('findCat exec');
  //   return this.CatService.findCatById(id);
  // }
}
