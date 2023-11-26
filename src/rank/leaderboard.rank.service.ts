import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class LeaderboardService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getLeaderboard(limit?: number): Promise<{ [key: number]: User }> {
    const users = await this.userModel.find().sort({ level: -1, xp: -1 }).limit(limit).exec();
    return users.reduce((leaderboard, user, index) => ({ ...leaderboard, [(index + 1)]: user.toObject() }), {});
  }
}
