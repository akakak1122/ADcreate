import { HttpException, Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getClientIp } from 'request-ip';
import { CachingService } from '../transaction/caching';

@Injectable()
export class IPMiddleware implements NestMiddleware {
  constructor(private cacheManager: CachingService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const clientIp = getClientIp(req).split(':').pop();
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
