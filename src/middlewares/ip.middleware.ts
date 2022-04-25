import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IPMiddleware implements NestMiddleware {
  constructor(
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const clientIp = (String)(req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(':').pop();
    req.clientIp = clientIp;
    next();
  }
}
