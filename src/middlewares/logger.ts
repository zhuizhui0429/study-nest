import { Request, Response, NextFunction } from 'express';
export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('query', req.query);
  console.log('logger中间件exec');
  next();
}
