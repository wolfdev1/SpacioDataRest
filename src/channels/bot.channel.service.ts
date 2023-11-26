// Import necessary modules
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BotChannel, BotChannelDocument } from '../schemas/bot_channel.schema';
import { GuildChannel, GuildChannelDocument } from '../schemas/guild_channel.schema';
import { messages } from '../consts/api.messages';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
export class BotChannelService {
  // Inject the BotChannel and GuildChannel models into the service
  constructor(@InjectModel(BotChannel.name) private botChannelModel: Model<BotChannelDocument>, @InjectModel(GuildChannel.name) private guildChannelModel: Model<GuildChannelDocument>) {}

  // Method to get all bot channels
  async getBotChannels(): Promise<{ [key: number]: BotChannel }> {
    // Use try-catch to handle any potential database errors
    try {
      // Query the database for all bot channels
      const botChannels = await this.botChannelModel.find().exec();
      // Return the channels as an object with the index as the key and the channel as the value
      return botChannels.reduce((list, channel, index) => ({
        ...list, [(index + 1)]: channel.toObject() 
      }), {});
    } catch (error) {
      // If an error occurs, throw an InternalServerErrorException
      throw new InternalServerErrorException(messages.channel.failGetBotChannels);
    }
  }

  // Method to update a bot channel
  async putBotChannel(channel: BotChannel): Promise<any> {
    // Validate the channel before querying the database
    if (!channel || typeof channel !== 'object') {
      throw new BadRequestException(messages.channel.badRequest2);
    }

    // Use try-catch to handle any potential mongoose errors
    try {
      // Query the database to update the bot channel
      await this.botChannelModel.updateOne({ id: channel.id }, { $set: channel }).exec();
    } catch (error) {
      // If an error occurs, throw an InternalServerErrorException
      throw new InternalServerErrorException(messages.channel.failAddBotChannel);
    }
  }

  // Method to get a bot channel by its ID
  async getBotChannelById(id: string): Promise<BotChannel> {
    // Query the database for the bot channel with the given ID and return the result
    return await this.botChannelModel.findOne({ id: id }).exec();
  }
}