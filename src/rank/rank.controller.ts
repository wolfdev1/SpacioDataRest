import { Controller, Get, Injectable, Res } from '@nestjs/common';

import { Response } from 'express';
import { User } from '../schemas/user.schema';
import { Put, Query } from '@nestjs/common/decorators/http';
import { RankService } from './rank.service';
import { messages } from 'src/consts/api.messages';
import { LeaderboardService } from './leaderboard.rank.service';
import { ResetService } from './reset.rank.service';
import { SetService } from './set.rank.service';

@Controller("rank")
@Injectable()
export class RankController {
  constructor(private readonly rankService: RankService, private readonly leaderboard: LeaderboardService, private readonly reset: ResetService, private readonly set: SetService) {}
  
  @Get()
  findAll(@Res() res: Response): any {
    return res.status(400).json(messages.rank.badRequest);
  }

    @Get('leaderboard')
    async getLeaderboard(@Query('limit') limit?: number): Promise<{ [key: string]: User }> {
        const leaderboard = await this.leaderboard.getLeaderboard(limit);
        return leaderboard;
    }

    @Put('user/resetxp')
    async putResetXp(@Query('userId') userId: string, @Res() res: Response): Promise<any> {
        const user = await this.reset.resetXp(await this.rankService.getUserById(userId));
        res.status(user.status).json(user);
    }

    @Put('user/setxp')
    async putSetXp(@Query('userId') userId: string, @Query('xp') xp: number, @Res() res: Response): Promise<any> {

        try {
        const user = await this.set
            .setXp(await this.rankService.getUserById(userId), parseInt(xp.toString()));
        res.status(user.status).json(user);
        } catch (error) {
            res.status(400).json({ message: messages.rank.badRequest2 });
        }
    }

    @Get('user/resetxp')
    async getDefaultResetXp(@Res() res: Response): Promise<any> {
        res.status(400).json(messages.rank.badRequest);
    }

    @Get('user/setxp')
    async getDefaultSetXp(@Res() res: Response): Promise<any> {
        res.status(400).json(messages.rank.badRequest);
    }

}
