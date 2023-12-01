// Import necessary modules
import { HttpStatus, Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { messages } from '../consts/api.messages';
import { PrismaService } from '../prisma.service';
import { botchannels } from '@prisma/client';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
export class BotChannelService {
  // Inject prisma into the service
  constructor(private prisma: PrismaService) {}

  // Method to get all bot channels
  async getBotChannels(): Promise<{ [key: number]: botchannels }> {
    // Query the database for all bot channels
    const botChannels = await this.prisma.botchannels.findMany();
    // Return the channels as an object with the index as the key and the channel as the value
    return botChannels.reduce((list, channel, index) => ({
      ...list, [(index + 1)]: channel
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
  if (!await this.prisma.guildchannels.findFirst({ where: { id } })) {
    // Return a message and a BAD_REQUEST status if the guild channel does not exist
    return { message: `Channel doesn't exist in guild`, status: HttpStatus.BAD_REQUEST };
  }

  try {
    let message = '';
    // Check if the bot channel exists by ID
    if (await this.getBotChannelById(id)) {
      // Update the bot channel if it exists
      await this.prisma.botchannels.updateMany({
        where: { id_: id },
        data: { name: name }
      });
      message = `Channel '${id}' has been updated with name ${name}.`;
    } 
    // Check if the bot channel exists by name
    else if (await this.getBotChannelByNames(name)) {
      // Update the bot channel if it exists
      await this.prisma.botchannels.updateMany({
        where: { name: name },
        data: { id_: id }
      });
      message = `Channel '${name}' has been updated with id ${id}.`;
    } 
    // If the bot channel doesn't exist, create a new one
    else {
      this.prisma.botchannels.create({
        data: {
          id_: id,
          name: name
        }
      });
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
  async getBotChannelById(id: string): Promise<botchannels> {
    // Query the database for the bot channel with the given ID and return the result
    return this.prisma.botchannels.findFirst({
      where: { id_: id }
    });
  }

  async getBotChannelByNames(name: string): Promise<botchannels> {
    return this.prisma.botchannels.findFirst({ where: {
      name: name
    } });
    }
  }