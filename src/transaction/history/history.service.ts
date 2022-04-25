import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { History, HistoryDocument } from './schemas/history.schema';
import { CreateHistoryDto } from './dto/create-history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name)
    private readonly historyModel: Model<HistoryDocument>,
  ) {}

  async create(input: CreateHistoryDto): Promise<History> {
    const result = await this.historyModel.create(input);
    return result;
  }

  async findAll(): Promise<History[]> {
    const historys = await this.historyModel.find().sort({ createdAt: -1 });;

    return historys;
  }

  async deleteAll(): Promise<Boolean> {
    const history = await this.historyModel.deleteMany();
    return true;
  }
}
