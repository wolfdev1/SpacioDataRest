import { Controller, Get, Injectable, Res } from '@nestjs/common';

import { Response } from 'express';
import { Put, Query } from '@nestjs/common/decorators/http';
import { BotChannelService } from './bot.channel.service';
import { GuildChannelService } from './guild.channel.service';
import { XpChannelService } from './xp.channel.service';
import { BotChannel } from 'src/schemas/bot_channel.schema';
import { messages } from '../consts/api.messages';

@Controller("channels")
@Injectable()
export class ChannelController {
  constructor(private readonly botChannelService: BotChannelService, private readonly guildChannelService: GuildChannelService, private readonly xpChannelService: XpChannelService) {}
    
    @Get()
    findAll(@Res() res: Response): any {
        return res.status(400).json({message: messages.channel.badRequest});
    }

    @Get('guild')
    async getGuildChannels(@Query('showPrivate') showPrivate?: boolean, @Res() res?: Response): Promise<any> {
        const channels = await this.guildChannelService.getGuildChannels();

        if (showPrivate) {
            res.status(200).json(channels);
        }
        res.status(200).json(Object.values(channels).filter(channel => !channel.private));
    }

    @Get('bot')
    async getBotChannels(@Res() res: Response): Promise<any> {
        const channels = await this.botChannelService.getBotChannels();
        res.status(200).json(channels);
    }

    @Get('xp')
    async getXpChannels(@Res() res: Response): Promise<any> {
        const channels = await this.xpChannelService.getXpChannels();
        res.status(200).json(channels);
    }

    @Put('bot')
    async putBotChannel(@Query('id') id: string, @Query('name') name: string, @Res() res: Response): Promise<any> {
        const newChannel: BotChannel = {id: id, name: name} as BotChannel;
        const channel = await this.botChannelService.putBotChannel(newChannel);
        res.status(channel.status).json(channel);
    }

    @Put('xp')
    async putXpChannel(@Query('id') id: string, @Res() res: Response): Promise<any> {
        const channel = await this.xpChannelService.putXpChannel(id);
        res.status(channel.status).json(channel);
    }

}
