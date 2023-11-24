import { Controller, Get, Injectable, NotFoundException, Param, Res } from '@nestjs/common';

import { Response } from 'express';
import { User } from '../schemas/user.schema';
import { Put, Query } from '@nestjs/common/decorators/http';
import { RankService } from './rank.service';

@Controller("rank")
@Injectable()
export class RankController {
  constructor(private readonly rankService: RankService) {}
  private readonly msg = { message: "Bad Request. This endpoint works with PUT requests and use /rank/user/resetxp or ../setxp endpoints." };
  
  @Get()
  findAll(@Res() res: Response): any {
    return res.status(400).json(this.msg);
  }

    @Get('leaderboard')
    async getLeaderboard(@Query('limit') limit?: number): Promise<{ [key: string]: User }> {
        const leaderboard = await this.rankService.getLeaderboard(limit);
        return leaderboard;
    }

    @Put('user/resetxp')
    async putResetXp(@Query('userId') userId: string, @Res() res: Response): Promise<any> {
        const user = await this.rankService.resetXp(await this.rankService.getUserById(userId));
        res.status(user.status).json(user);
    }

    @Put('user/setxp')
    async putSetXp(@Query('userId') userId: string, @Query('xp') xp: number, @Res() res: Response): Promise<any> {

        try {
        const user = await this.rankService.setXp(await this.rankService.getUserById(userId), parseInt(xp.toString()));
        res.status(user.status).json(user);
        } catch (error) {
            res.status(400).json({ message: "Bad Request. Please check the id and xp." });
        }
    }

    @Get('user/resetxp')
    async getDefaultResetXp(@Res() res: Response): Promise<any> {
        res.status(400).json(this.msg);
    }

    @Get('user/setxp')
    async getDefaultSetXp(@Res() res: Response): Promise<any> {
        res.status(400).json(this.msg);
    }

}
