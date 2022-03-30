import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { History, HistorySchema } from './schemas/history.schema';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { AuthModule } from '../auth';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]),
    AuthModule,
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
