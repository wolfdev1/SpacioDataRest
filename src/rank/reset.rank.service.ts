import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { messages } from 'src/consts/api.messages';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class ResetService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private readonly logger = new Logger("Rank");

  async resetXp(user: User): Promise<any> {
    if (!user) {
      throw new NotFoundException(messages.rank.notFound);
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
}
