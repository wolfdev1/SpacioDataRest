// Import necessary modules and classes
import { Controller, Get, Put, Query, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { BotChannelService } from './bot.channel.service';
import { XpChannelService } from './xp.channel.service';
import { Response } from 'express';
import { BotChannel } from '../schemas/bot_channel.schema';
import { GuildChannelService } from './guild.channel.service';
import { messages } from '../consts/api.messages';

// Use the @Controller decorator to define the controller and the base route
@Controller('channels')
export class ChannelController {
  // Inject the BotChannelService and XpChannelService into the controller
  constructor(private readonly botChannelService: BotChannelService, private readonly xpChannelService: XpChannelService, private readonly guildChannelService: GuildChannelService) {}

    // Define a default GET endpoint
    @Get()
    async default(): Promise<any> {
        // Throw a BadRequestException
        throw new BadRequestException(messages.channel.badRequest);
    }

    // Define a GET endpoint for retrieving bot channels
    @Get('bot')
    async getBotChannels(@Res() res: Response): Promise<any> {
        try {
        // Call the botChannelService to get the bot channels
        const channels = await this.botChannelService.getBotChannels();
        // Send the channels as the response
        res.status(HttpStatus.OK).json(channels);
        } catch (error) {
        // If an error occurs, throw a BadRequestException
        throw new BadRequestException(error.message);
        }
    }

    // Define a GET endpoint for retrieving XP channels
    @Get('xp')
    async getXpChannels(@Res() res: Response): Promise<any> {
        try {
        // Call the xpChannelService to get the XP channels
        const channels = await this.xpChannelService.getXpChannels();
        // Send the channels as the response
        res.status(HttpStatus.OK).json(channels);
        } catch (error) {
        // If an error occurs, throw a BadRequestException
        throw new BadRequestException(error.message);
        }
    }

    // Define a GET endpoint for retrieving guild channels
    @Get('guild')
    async getGuildChannels(@Res() res: Response): Promise<any> {
    try {
        // Call the guildChannelService to get the guild channels
        const channels = await this.guildChannelService.getGuildChannels();
        // Send the channels as the response
        res.status(HttpStatus.OK).json(channels);
    } catch (error) {
        // If an error occurs, throw a BadRequestException
        throw new BadRequestException(error.message);
        }
    }

    // Define a PUT endpoint for updating a bot channel
    @Put('bot')
    async putBotChannel(@Query('id') id: string, @Query('name') name: string, @Res() res: Response): Promise<any> {
        // Validate the input parameters
        if (!id || !name) {
        throw new BadRequestException('Invalid parameters');
        }
        try {
        // Create a new BotChannel object
        const newChannel: BotChannel = {id: id, name: name} as BotChannel;
        // Call the botChannelService to update the bot channel
        const channel = await this.botChannelService.putBotChannel(newChannel);
        // Send the updated channel as the response
        res.status(HttpStatus.OK).json(channel);
        } catch (error) {
        // If an error occurs, throw a BadRequestException
        throw new BadRequestException(error.message);
        }
    }
    
    // Define a PUT endpoint for updating an XP channel
    @Put('xp')
    async putXpChannel(@Query('id') id: string, @Res() res: Response): Promise<any> {
        // Validate the input parameters
        if (!id) {
        throw new BadRequestException('Invalid parameters');
        }
        try {
        // Call the xpChannelService to update the XP channel
        const channel = await this.xpChannelService.putXpChannel(id);
        // Send the updated channel as the response
        res.status(HttpStatus.OK).json(channel);
        } catch (error) {
        // If an error occurs, throw a BadRequestException
        throw new BadRequestException(error.message);
        }
    }
}