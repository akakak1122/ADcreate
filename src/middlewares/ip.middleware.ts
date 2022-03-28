import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getClientIp } from 'request-ip';

@Injectable()
export class IPMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientIp = getClientIp(req);
    console.log('ip', clientIp);
    next();
  }
}
