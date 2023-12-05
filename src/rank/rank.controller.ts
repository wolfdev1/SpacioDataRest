// Import necessary modules and classes
import { Controller, Get, MethodNotAllowedException, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { LeaderboardService } from './leaderboard.rank.service';
import { ResetService } from './reset.rank.service';
import { SetService } from './set.rank.service';
import { messages } from '../consts/api.messages';

// Controller decorator to define the route path
@Controller('rank')
export class RankController {
  // Constructor to inject the necessary services
  constructor(
    private readonly leaderboard: LeaderboardService, // Service to handle leaderboard related operations
    private readonly reset: ResetService, // Service to handle XP reset operations
    private readonly set: SetService // Service to handle XP set operations
  ) {}

  // Route to get the leaderboard
    @Get('leaderboard')
    async getLeaderboard(@Query('limit') limit?: number): Promise<{ [key: string]: object }> {
        // Call the leaderboard service to get the leaderboard and return it
        return await this.leaderboard.getLeaderboard(limit);
    }

    // Endpoint to handle GET requests for setting XP, which is not allowed
    @Get('user/setxp')
        async getDefaultSetXp(): Promise<any> {
        // Return a 405 Method Not Allowed error
        // server understands the request, but refuses to authorize it
        throw new MethodNotAllowedException(messages.general.notAllowed);
    }

    @Get('user/resetxp')
    async getDefaultResetXp(): Promise<any> {
        // Return a 405 Method Not Allowed error
        // server understands the request, but refuses to authorize it
        throw new MethodNotAllowedException(messages.general.notAllowed);
    }   

    @Put('user/setxp')
    async putSetXp(@Query('userId') userId: string, @Query('xp') xp: number, @Res() res: Response): Promise<any> {
        // Call the set service to set the user's XP and return the result
        const set = await this.set.setXp(userId, xp);
        res.status(set.status).json(set);
    }

    // Route to reset XP for a user
    @Put('user/resetxp')
    async putResetXp(@Query('userId') userId: string, @Res() res: Response): Promise<any> {
        // Call the reset service to reset the user's XP and return the result
        const reset = await this.reset.resetXp(userId);
        res.status(reset.status).json(reset);
        }
    }