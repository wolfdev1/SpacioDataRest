import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class RankService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private readonly logger = new Logger(RankService.name);

  async getLeaderboard(limit?: number): Promise<{ [key: number]: User }> {
    const users = await this.userModel.find().sort({ level: -1, xp: -1 }).limit(limit).exec();
    return users.reduce((leaderboard, user, index) => ({ ...leaderboard, [(index + 1)]: user.toObject() }), {});
  }

  async getDefault(): Promise<any> {
    return { message: "Bad Request. Please try again with other request.", status: 400 };
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findOne({ userId: id }).exec();
  }

  async resetXp(user: User): Promise<any> {
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    await this.userModel.updateOne(
            { userId: user.userId },
            { xp: 0, level: 0 }
        ).exec()
        .then(() => this.logger.log(`User ${user.userId} XP reseted.`));

    return {
        message: `User ${user.userId} XP reseted.`,
        status: 200
    };
  }

  async setXp(user: User, xp: number): Promise<any> {
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    const level = Math.floor(xp / 350);
    await this.userModel.updateOne(
            {userId: user.userId },
            { xp: xp, level: level }
        ).exec()
        .then(() => this.logger.log(`User ${user.userId} XP set to ${xp} (Level ${level}).`));

    return {
        message: `User ${user.userId} XP set to ${xp} (Level ${level}).`,
        status: 200
    };
  }
}
