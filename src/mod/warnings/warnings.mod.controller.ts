import { Controller, Get, Injectable, NotFoundException, Param, Res } from '@nestjs/common';

import { Response } from 'express';
import { Warn } from '../../schemas/warn.schema';
import { Delete } from '@nestjs/common/decorators/http';
import { WarningsService } from './warnings.mod.service'; 
import { messages } from '../../consts/api.messages';

@Controller("mod/warnings")
@Injectable()
export class WarningsController {
  constructor(private readonly warnService: WarningsService) {}
  
    @Get()
    default(): any {
        throw new NotFoundException(messages.warnings.notFound);
    }
    
    @Get('user')
    async getDefault(@Res() res: Response): Promise<any> {
        res.status(400).json(messages);
    }

    @Delete('warn')
    async deleteDefault(@Res() res: Response): Promise<any> {
        res.status(400).json(messages.warnings.badRequest);
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
