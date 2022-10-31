import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
@Injectable()
export class CatGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 从元数据中获取本次请求受到的role约束
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const res = context.switchToHttp().getRequest(); //取到请求对象,在这里进行鉴权处理
    // 判断是否有权限
    if (Math.random() > 0.5) {
      return true;
    }
    throw new ForbiddenException({
      error: '没有权限操作猫',
    });
  }
}
