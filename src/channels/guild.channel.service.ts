// Import the necessary modules
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { messages } from '../consts/api.messages';
import { PrismaService } from '../prisma.service';
import { guildchannels } from '@prisma/client';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
export class GuildChannelService {
  constructor(private prisma: PrismaService) {}

  // Method to get all guild channels
  async getGuildChannels(): Promise<{ [key: number]: guildchannels }> {
    // Use try-catch to handle any potential database errors
    try {
      // Query the database for all guild channels
      const guildChannels = await this.prisma.guildchannels.findMany();
      // Return the channels as an object with the position as the key and the channel as the value
      return guildChannels.reduce((list, channel) => ({
        ...list, [(channel.position + 1)]: channel
      }), {});
    } catch (error) {
      // If an error occurs, throw an InternalServerErrorException
      throw new InternalServerErrorException(messages.channel.internalServerError);
    }
  }
}