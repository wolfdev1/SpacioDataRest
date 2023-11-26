// Import necessary modules and classes
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotChannelSchema } from '../schemas/bot_channel.schema';
import { XpChannelSchema } from '../schemas/xp_channel.schema';
import { GuildChannelSchema } from '../schemas/guild_channel.schema';
import { XpChannelService } from './xp.channel.service';
import { BotChannelService } from './bot.channel.service';
import { ChannelController } from './channel.controller';
import { GuildChannelService } from './guild.channel.service';

// Use the @Module decorator to define the module
@Module({
  // Import MongooseModule for database interaction and define the schemas for 'BotChannel', 'XpChannel', and 'GuildChannel'
  imports: [
    MongooseModule.forFeature([{ name: 'BotChannel', schema: BotChannelSchema }]),
    MongooseModule.forFeature([{ name: 'XpChannel', schema: XpChannelSchema }]),
    MongooseModule.forFeature([{ name: 'GuildChannel', schema: GuildChannelSchema }])
  ],
  // Define the controllers that should be instantiated for this module
  controllers: [
    ChannelController
  ],
  // Define the providers that should be instantiated for this module
  providers: [
    XpChannelService,
    BotChannelService,
    GuildChannelService
  ],
})

// Export the module class
export class ChannelModule {}