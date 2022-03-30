import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async find(uid: string): Promise<User> {
    const user = await this.userModel.findOne({ uid });
    if (!user) {
      throw new Error('없는 유저입니다.');
    }

    return user;
  }
}
