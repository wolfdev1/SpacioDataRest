import { Controller, Get, Injectable, NotFoundException, Param, Res, BadRequestException, Delete } from '@nestjs/common';
import { Response } from 'express';
import { Warn } from '../../schemas/warn.schema';
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
  async getDefault(): Promise<any> {
    throw new BadRequestException(messages.warnings.badRequest);
  }

  @Delete('warn')
  async deleteDefault(): Promise<any> {
    throw new BadRequestException(messages.warnings.badRequest);
  }

  @Get('user/:id')
  async getUserWarnings(@Param('id') id: string): Promise<{ [key: string]: Warn }> {
    const user = await this.warnService.getUserById(id);
    return await this.warnService.getUserWarnings(user);
  }

  @Delete('warn/:id')
  async deleteWarn(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const warn = await this.warnService.getWarnById(id);
    const deleted = await this.warnService.deleteWarn(warn);
    res.status(deleted.status).json(deleted);
  }
}
