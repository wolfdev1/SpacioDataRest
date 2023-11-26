import { Controller, Get, Injectable, NotFoundException, Param, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { messages } from '../consts/api.messages';
import { UserDto } from '../dto/user.dto';
import { Response } from 'express';

@Controller("user")
@Injectable()

export class UserController {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDto>) {}

  @Get()
  findAll(@Res() res: Response): any {
    res.status(400).json({ message: messages.user.badRequest, statusCode: 400, error: "Bad Request" });
  }

  @Get(":id")
  async getUserById(@Param() params: any): Promise<UserDto> {
    let user: UserDto | PromiseLike<UserDto>;
    try {
      user = await this.userModel.findOne({userId: params.id}).exec();
    } catch (error) {
      console.log(error);
      throw new NotFoundException(messages.user.notFound);
      
    }
    if (!user) {
      throw new NotFoundException(messages.user.notFound);
    }
    return user;
  }
}
