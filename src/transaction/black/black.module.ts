import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Black, BlackSchema } from './schemas/black.schema';
import { BlackController } from './black.controller';
import { BlackService } from './black.service';
import { CachingModule } from '../caching';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Black.name, schema: BlackSchema }]),
    CachingModule,
  ],
  controllers: [BlackController],
  providers: [BlackService],
  exports: [BlackService],
})
export class BlackModule {}
