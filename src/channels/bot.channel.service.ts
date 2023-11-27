// Import necessary modules
import { HttpStatus, Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
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
    // Query the database for all bot channels
    const botChannels = await this.botChannelModel.find().select('-_id').exec();
    // Return the channels as an object with the index as the key and the channel as the value
    return botChannels.reduce((list, channel, index) => ({
      ...list, [(index + 1)]: channel.toObject()
    }), {});
  }

// Method to update a bot channel
async putBotChannel(id: string, name: string): Promise<any> {
  // Validate input parameters
  if (!id || typeof id !== 'string' || !name || typeof name !== 'string') {
    // Throw a BadRequestException if the input parameters are not valid
    throw new BadRequestException(messages.channel.badRequest2);
  }

  // Check if the guild channel exists
  if (!await this.guildChannelModel.exists({ id })) {
    // Return a message and a BAD_REQUEST status if the guild channel does not exist
    return { message: `Channel doesn't exist in guild`, status: HttpStatus.BAD_REQUEST };
  }

  try {
    let message = '';
    // Check if the bot channel exists by ID
    if (await this.getBotChannelById(id)) {
      // Update the bot channel if it exists
      await this.botChannelModel.updateOne({ id }, { $set: { id, name } });
      message = `Channel '${id}' has been updated with name ${name}.`;
    } 
    // Check if the bot channel exists by name
    else if (await this.getBotChannelByNames(name)) {
      // Update the bot channel if it exists
      await this.botChannelModel.updateOne({ name }, { $set: { id, name } });
      message = `Channel '${name}' has been updated with id ${id}.`;
    } 
    // If the bot channel doesn't exist, create a new one
    else {
      const newBotChannel = new this.botChannelModel({ id, name });
      await newBotChannel.save();
      message = `Channel '${name}' with id '${id}' has been added to bot channels.`;
    }

    // Return the result
    return {
      message,
      status: HttpStatus.OK
    };
  } catch (error) {
    // Log the error and throw an InternalServerErrorException
    console.log(error);
    throw new InternalServerErrorException(messages.channel.failAddBotChannel);
  }
}

  // Method to get a bot channel by its ID
  async getBotChannelById(id: string): Promise<BotChannel> {
    // Query the database for the bot channel with the given ID and return the result
    return this.botChannelModel.findOne({ id }).exec();
  }

  async getBotChannelByNames(name: string): Promise<BotChannel> {
    return this.botChannelModel.findOne({ name }).exec();
    }
  }