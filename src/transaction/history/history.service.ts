import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { History, HistoryDocument } from './schemas/history.schema';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name)
    private readonly historyModel: Model<HistoryDocument>,
  ) {}

  async create(ip: string): Promise<History> {
    const result = await this.historyModel.create(ip);

    return result;
  }

  async findAll(): Promise<History[]> {
    const historys = await this.historyModel.find();

    return historys;
  }

  async deleteAll(): Promise<Boolean> {
    const history = await this.historyModel.remove();
    return true;
  }
}
