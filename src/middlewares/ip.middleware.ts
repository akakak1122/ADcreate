import { HttpException, Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CachingService } from '../transaction/caching';

@Injectable()
export class IPMiddleware implements NestMiddleware {
  constructor(
    private cacheManager: CachingService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const clientIp = (String)(req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(':').pop();
    req.clientIp = clientIp;

    const blacked = await this.cacheManager.get(`Black:${clientIp}`);
    if (blacked) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        message: 'Access Denied Error',
      }, HttpStatus.FORBIDDEN);
    }
    next();
  }
}
