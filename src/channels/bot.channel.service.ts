import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotChannel, BotChannelDocument } from '../schemas/bot_channel.schema';
import { GuildChannel, GuildChannelDocument } from 'src/schemas/guild_channel.schema';

@Injectable()
export class BotChannelService {
  constructor(@InjectModel(BotChannel.name) private botChannelModel: Model<BotChannelDocument>, @InjectModel(GuildChannel.name) private guildChannelModel: Model<GuildChannelDocument>) {}

  async getBotChannels(): Promise<{ [key: number]: BotChannel }> {
    try {
      const botChannels = await this.botChannelModel.find().exec();
      return botChannels.reduce((list, channel, index) => ({ ...list, [(index + 1)]: channel.toObject() }), {});
    } catch (error) {
      throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Failed to get text channels' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async putBotChannel(channel: BotChannel): Promise<any> {
    try {
      if (!channel) {
        throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: 'Channel requires a name & id, please try again.' }, HttpStatus.BAD_REQUEST);
      }

      if (await this.botChannelModel.exists({ id: channel.id })) {
        throw new HttpException({ status: HttpStatus.CONFLICT, error: 'Channel already exists' }, HttpStatus.CONFLICT);
      }

      if (this.guildChannelModel.exists({ id: channel.id })) {
        this.botChannelModel.create(channel);
        return {
            message: `Channel ${channel.name} with id ${channel.id} added to bot channels.`,
            status: 200
          };
      }
    } catch (error) {
      throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, error: 'Failed to add bot channel' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getBotChannelById(id: string): Promise<BotChannel> {
    return await this.botChannelModel.findOne({ id: id }).exec();
  }
}
