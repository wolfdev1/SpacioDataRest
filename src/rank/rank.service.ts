import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { messages } from '../consts/api.messages';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class RankService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getDefault(): Promise<any> {
    return { message: messages.rank.badRequest, status: 400 };
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findOne({ userId: id }).exec();
  }
}
