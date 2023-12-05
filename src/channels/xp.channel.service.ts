import { Injectable, BadRequestException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { messages } from '../consts/api.messages';
import { PrismaService } from '../prisma.service';
import { xpchannels } from '@prisma/client';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
export class XpChannelService {
  constructor(private prisma: PrismaService) {}

  // Method to get all XP channels
  async getXpChannels(): Promise<{ [key: number]: xpchannels }> {
    // Use try-catch to handle any potential database errors
    try {
      // Query the database for all XP channels
      const xpChannels = await this.prisma.xpchannels.findMany();
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
    try {
      // Validate the input, it should be a string and not null or undefined
      if (!id || typeof id !== 'string') {
        throw new BadRequestException(messages.channel.badRequest3);
      }

      // Check if the XP channel already exists in the database
      if (await this.prisma.xpchannels.findFirst({ where: { id_: id } })) {
        throw new ConflictException(messages.channel.channelExists);
      }

      // Check if the guild channel exists in the database
      if (!await this.prisma.guildchannels.findFirst({ where: { id } })) {
        throw new ConflictException(messages.channel.channelNotExists);
      }

      // If the XP channel doesn't exist and the guild channel does exist, create a new XP channel
      await this.prisma.xpchannels.create({
        data: {
          id_: id,
          id: '',
          v: 0, 
        }
      })

      // Return a success message
      return { message: `Channel with id '${id}' added to XP channels`, status: 200 };
    } catch (error) {
      // Log the error and throw an Internal Server Error exception
      console.log(error);
      throw new InternalServerErrorException(messages.channel.internalServerError);
    }
  }
}