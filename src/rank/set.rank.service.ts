import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { messages } from 'src/consts/api.messages';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class SetService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private readonly logger = new Logger("Rank");


  async setXp(user: User, xp: number): Promise<any> {
    if (!user) {
      throw new NotFoundException(messages.rank.notFound);
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
