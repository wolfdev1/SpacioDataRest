import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GuildChannel, GuildChannelDocument } from 'src/schemas/guild_channel.schema';

@Injectable()
export class GuildChannelService {

  constructor(@InjectModel(GuildChannel.name) private guildChannelModel: Model<GuildChannelDocument>) {}

  async getGuildChannels(): Promise<{ [key: number]: GuildChannel }> {
    try {
      const guildChannels = await this.guildChannelModel.find().exec();
      return guildChannels.reduce((list, channel, index) => ({ ...list, [(index + 1)]: channel.toObject() }), {});
    } catch (error) {
      throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Failed to get guild channels' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
