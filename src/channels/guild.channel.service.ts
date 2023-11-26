// Import the necessary modules
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GuildChannel, GuildChannelDocument } from '../schemas/guild_channel.schema';
import { messages } from '../consts/api.messages';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
export class GuildChannelService {
  // Inject the GuildChannel model into the service
  constructor(@InjectModel(GuildChannel.name) private guildChannelModel: Model<GuildChannelDocument>) {}

  // Method to get all guild channels
  async getGuildChannels(): Promise<{ [key: number]: GuildChannel }> {
    // Use try-catch to handle any potential database errors
    try {
      // Query the database for all guild channels
      const guildChannels = await this.guildChannelModel.find().exec();
      // Return the channels as an object with the position as the key and the channel as the value
      return guildChannels.reduce((list, channel) => ({
        ...list, [(channel.position + 1)]: channel.toObject() 
      }), {});
    } catch (error) {
      // If an error occurs, throw an InternalServerErrorException
      throw new InternalServerErrorException(messages.channel.internalServerError);
    }
  }
}