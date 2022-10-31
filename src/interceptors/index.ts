import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
/**
 * 打印logger信息拦截器,在使用时需要放在第一位
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('整个请求开始～');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`整个请求结束...,花费时间: ${Date.now() - now}ms`),
        ),
      );
  }
}
/**
 * 转化响应体拦截器,route handler一定在所有的自定义拦截器执行完之前就执行完毕了, 因此可以在next.handle()执行后获取到
 * 最初的响应对象从而进行转化
 */
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('开始转换响应体');
    return next.handle().pipe(
      map((originRes) => {
        console.log('原始的响应为', originRes);
        return {
          success: true,
          message: '请求成功',
          data: originRes,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
