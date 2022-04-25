import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBlackDto } from './dto/create-black.dto';
import { Black, BlackDocument } from './schemas/black.schema';

@Injectable()
export class BlackService {
  constructor(
    @InjectModel(Black.name)
    private readonly blackModel: Model<BlackDocument>,
  ) {}

  async create(blackdto: CreateBlackDto): Promise<Black> {
    const black = {
      ...blackdto,
    };
    const result = await this.blackModel.create(black);

    return result;
  }

  async findAll(): Promise<Black[]> {
    const blacks = await this.blackModel.find().sort({ createdAt: -1 });

    return blacks;
  }

  async find(id: string): Promise<Black> {
    const black = await this.blackModel.findOne({ _id: id });
    if (!black) {
      throw new Error('없는 주소입니다.');
    }

    return black;
  }

  async delete(id: string): Promise<Black> {
    const black = await this.blackModel.findOne({ _id: id });
    if (!black) {
      throw new Error('없는 주소입니다.');
    }
    const result = await this.blackModel.findOneAndDelete({ _id: id });

    return result;
  }
}
