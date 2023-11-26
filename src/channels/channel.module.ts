import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BotChannelSchema } from '../schemas/bot_channel.schema';
import { XpChannelSchema } from '../schemas/xp_channel.schema';
import { GuildChannelSchema } from '../schemas/guild_channel.schema';
import { XpChannelService } from './xp.channel.service';
import { BotChannelService } from './bot.channel.service';
import { ChannelController } from './channel.controller';
import { GuildChannelService } from './guild.channel.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'BotChannel', schema: BotChannelSchema }]),
        MongooseModule.forFeature([{ name: 'XpChannel', schema: XpChannelSchema }]),
        MongooseModule.forFeature([{ name: 'GuildChannel', schema: GuildChannelSchema }])
    ],
    controllers: [
        ChannelController
    ],
    providers: [
        XpChannelService,
        BotChannelService,
        GuildChannelService
    ],
})
export class ChannelModule {}
