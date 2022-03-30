import {
  Controller,
  Delete,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { History } from './schemas/history.schema';
import { HistoryService } from './history.service';

import { AuthGuard } from '../auth';

@Controller('/api/history')
export class HistoryController {
  constructor(private readonly historyervice: HistoryService) {}

  @Get('/')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async find(): Promise<History[]> {
    return this.historyervice.findAll();
  }

  @Delete('/')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async delete(): Promise<any> {
    return this.historyervice.deleteAll();
  }
}
