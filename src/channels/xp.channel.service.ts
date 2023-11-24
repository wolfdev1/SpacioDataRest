import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { XpChannel, XpChannelDocument } from '../schemas/xp_channel.schema';

@Injectable()
export class XpChannelService {

  constructor(@InjectModel(XpChannel.name) private xpChannelModel: Model<XpChannelDocument>) {}

  async getXpChannels(): Promise<{ [key: number]: XpChannel }> {
    try {
      const xpChannels = await this.xpChannelModel.find().exec();
      return xpChannels.reduce((list, channel, index) => ({ ...list, [(index + 1)]: channel.id }), {});
    } catch (error) {
      throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Failed to get XP channels' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async putXpChannel(id: string): Promise<any> {
    try {
      if (!id) {
        throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'Channel requires a id, please try again.' }, HttpStatus.BAD_REQUEST);
      }

      if (await this.xpChannelModel.exists({ id: id })) {
        throw new HttpException({ status: HttpStatus.CONFLICT, error: 'XP Channel already exists' }, HttpStatus.CONFLICT);
      }

      (await this.xpChannelModel.create({ id: id , _id: false})).save();
      return {
          message: `Channel with id ${id} added to XP channels.`,
          status: 200
        };
    } catch (error) {
      throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Failed to add XP channel' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
