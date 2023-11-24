import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class RankService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getLeaderboard(limit?: number): Promise<{ [key: number]: User }> {

    let query = this.userModel.find().sort({ level: -1, xp: -1 });
    if (limit) {
      query = query.limit(limit);
    }
    const users = await query.exec();
    const leaderboard: { [key: number]: User } = {};
    users.forEach((user, index) => {

      leaderboard[(index + 1)] = user.toObject();
    });
    return leaderboard;
  }

  async getDefault(): Promise<any> {
    return { message: "Bad Request. Please try again with other request." };
  }

  async getUserById(id: string): Promise<User> {
        return this.userModel.findOne({ userId: id }).exec();
  }

  async resetXp(user: User): Promise<any> {
    if (!user) {
      throw new NotFoundException('Could not find user.');
    } else {
    this.userModel.updateOne({ userId: user.userId }, { xp: 0, level: 0 }).exec();
    return { message: `User ${user.userId} XP reseted.`, status: 200 };
    }
  }
  async setXp(user: User, xp: number): Promise<any> {
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    if (typeof xp !== 'number') {
      return { message: 'Bad Request. XP must be a number.', status: 400 };
    }
    const level = Math.floor(xp / 350);
    await this.userModel.updateOne({ userId: user.userId }, { xp: xp, level: level }).exec();
    return { message: `User ${user.userId} XP set to ${xp} (Level ${level}).`, status: 200 };
  }
}  
