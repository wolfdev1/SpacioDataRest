import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { messages } from '../consts/api.messages';
import { PrismaService } from '../prisma.service';
import { guildchannels } from '@prisma/client';

@Injectable()
export class GuildChannelService {
  constructor(private prisma: PrismaService) {}

  async getGuildChannels(): Promise<{ [key: number]: guildchannels }> {
    try {
      const guildChannels = await this.prisma.guildchannels.findMany();

      // Emphasize error handling within Prisma for more granular control
      if (!guildChannels) {
        throw new NotFoundException(messages.channel.failGetGuildChannels); // Specific error for missing channels
      }

      return guildChannels.reduce((list, channel) => (
        {
        ...list, [(channel.position + 1)]: channel
        }
      ), {});
    } catch (error) {
   
      console.error('Error fetching guild channels:', error);
      throw new InternalServerErrorException(messages.channel.internalServerError);
    }
  }
}
