// Import necessary modules and classes
import { Controller, Get, BadRequestException, Body, Post } from '@nestjs/common';
import { messages } from '../consts/api.messages';

@Controller('channels')
export class ChannelController {
  constructor() {}

    @Get()
    async default(): Promise<any> {
        throw new BadRequestException(messages.auth.default);
    }

    @Get('login')
    async login(): Promise<any> {
        throw new BadRequestException(messages.auth.default);
    }
}