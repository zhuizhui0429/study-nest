import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';
/**
 * 配合joi通过schema对post请求对每个参数进行精准校验,同时校验出错时得到具体的错误message
 * 该管道仅仅是对route handler的入参进行校验,校验通过直接返回入餐(没有进行转化)
 */
@Injectable()
export class CreateCatPipe implements PipeTransform {
  transform(value: any) {
    const schema = Joi.object({
      id: Joi.number(),
      name: Joi.string().min(1).max(10).default('zzx'),
      age: Joi.number(),
      breed: Joi.string().required(),
    });
    const { error, value: newVal } = schema.validate(value);
    console.log('带有默认值处理后的value', newVal);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}
