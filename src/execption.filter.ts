import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
/**
 * 自定义所有类型的exception(代码运行错误或者显式通过new HttpException抛出错误)处理器,统一抛出错误时返回的response格式
 */
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 拿到本次请求-响应过程上下文
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus?.() || 500; // 代码运行出错状态码默认为500
    const message = exception.message;
    // 自定义响应体格式
    response.status(status).json({
      error: true,
      message,
      data: null,
      timestamp: new Date().toISOString(),
    });
  }
}
