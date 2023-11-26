import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Warn, WarnDocument} from '../../schemas/warn.schema';
import { messages } from '../../consts/api.messages';

@Injectable()
export class WarningsService {
  constructor(@InjectModel(Warn.name) private warnModel: Model<WarnDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private readonly logger = new Logger(WarningsService.name);

  async getUserWarnings(user?: User): Promise<{ [key: number]: Warn }> {

    if (!user) {
      throw new NotFoundException(messages.warnings.notFound);
    }
    const warns = await this.warnModel.find({userId: user.userId}).exec();
    if (warns.length === 0) {
      throw new NotFoundException(messages.warnings.noWarns);
    }
    
    return warns.reduce((list, warn, index) => ({ ...list, [(index + 1)]: warn.toObject() }), {});
  }

  async deleteWarn(warn?: Warn): Promise<any> {

    if (!warn) {
      throw new NotFoundException(messages.warnings.notFound2);
    }
    await this.warnModel.deleteOne({warnId: warn.warnId}).exec()
    .then(() => this.logger.log(`Warn ${warn.warnId} deleted from user ${warn.userId}.`));

    return {
        message: `Warn ${warn.warnId} deleted from user ${warn.userId}.`,
        status: HttpStatus.OK
    };
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findOne({ userId: id }).exec();
  }

  async getWarnById(id: string): Promise<Warn> {
    return this.warnModel.findOne({ warnId: id }).exec();
  }
}
