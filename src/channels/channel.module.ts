// Import necessary modules and classes
import { Module } from '@nestjs/common';
import { XpChannelService } from './xp.channel.service';
import { BotChannelService } from './bot.channel.service';
import { ChannelController } from './channel.controller';
import { GuildChannelService } from './guild.channel.service';
import { PrismaService } from '../prisma.service';

// Use the @Module decorator to define the module
@Module({
  // Import MongooseModule for database interaction and define the schemas for 'BotChannel', 'XpChannel', and 'GuildChannel'
  imports: [],
  // Define the controllers that should be instantiated for this module
  controllers: [
    ChannelController
  ],
  // Define the providers that should be instantiated for this module
  providers: [
    XpChannelService,
    BotChannelService,
    GuildChannelService,
    PrismaService
  ],
})

// Export the module class
export class ChannelModule {}