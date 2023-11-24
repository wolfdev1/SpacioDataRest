import { Controller, Get, Injectable, NotFoundException, Param, Res } from '@nestjs/common';

import { Response } from 'express';
import { User } from '../../schemas/user.schema';
import { Warn } from 'src/schemas/warn.schema';
import { Delete, Put, Query } from '@nestjs/common/decorators/http';
import { WarningsService } from './warnings.mod.service'; 

@Controller("mod/warnings")
@Injectable()
export class WarningsController {
  constructor(private readonly warnService: WarningsService) {}
  private readonly msg = { message: "Bad Request. This endpoint works with GET and DELETE requests and use /mod/warnings/user & /mod/warnings/warn endpoint." };
  
    @Get()
    findAll(@Res() res: Response): any {
        return res.status(400).json(this.msg);
    }
    
    @Get('user')
    async getDefault(@Res() res: Response): Promise<any> {
        res.status(400).json(this.msg);
    }

    @Delete('warn')
    async deleteDefault(@Res() res: Response): Promise<any> {
        res.status(400).json(this.msg);
    }

    @Get('user/:id')
    async getUserDefault(@Param() params: any): Promise<{ [key: string]: Warn }> {
        const list = await this.warnService.getUserWarnings(await this.warnService.getUserById(params.id));
        return list;
    }

    @Delete('warn/:id')
    async deleteUserDefault(@Param() params: any, @Res() res: Response): Promise<any> {
        const warn = await this.warnService.getWarnById(params.id);
        const deleted = await this.warnService.deleteWarn(warn);
        res.status(deleted.status).json(deleted);
    }

}
