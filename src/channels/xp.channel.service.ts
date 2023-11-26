import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { XpChannel, XpChannelDocument } from '../schemas/xp_channel.schema';
import { messages } from '../consts/api.messages';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
export class XpChannelService {
  // Inject the XpChannel model into the service
  constructor(@InjectModel(XpChannel.name) private xpChannelModel: Model<XpChannelDocument>) {}

  // Method to get all XP channels
  async getXpChannels(): Promise<{ [key: number]: XpChannel }> {
    // Use try-catch to handle any potential database errors
    try {
      // Query the database for all XP channels
      const xpChannels = await this.xpChannelModel.find().exec();
      // Return the channels as an object with the index as the key and the channel ID as the value
      return xpChannels.reduce((list, channel, index) => ({
        ...list, [(index + 1)]: channel.id 
      }), {});
    } catch (error) {
      // If an error occurs, throw an InternalServerErrorException
      throw new InternalServerErrorException(messages.channel.failGetXpChannels);
    }
  }

  // Method to update an XP channel
  async putXpChannel(id: string): Promise<any> {
    // Validate the ID before querying the database
    if (!id || typeof id !== 'string') {
      throw new BadRequestException(messages.channel.badRequest3);
    }

    // Use try-catch to handle any potential database errors
    try {
      // Query the database to update the XP channel
      await this.xpChannelModel.updateOne({ id }, { $set: { id } }).exec();
    } catch (error) {
      // If an error occurs, throw an InternalServerErrorException
      throw new InternalServerErrorException(messages.channel.internalServerError);
    }
  }
}