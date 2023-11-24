import { Controller, Get, Injectable, NotFoundException, Param, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/user.dto';
import { Response } from 'express';

@Controller("user")
@Injectable()

export class UserController {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDto>) {}


  @Get()
  findAll(@Res() res: Response): any {
    res.status(400).json({ message: "Bad Request. User endpoint requires a id to retrive user data." });
  }

  @Get(":id")
  async getUserById(@Param() params: any): Promise<UserDto> {
    let user: UserDto | PromiseLike<UserDto>;
    try {
      user = await this.userModel.findOne({userId: params.id}).exec();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Could not find user.');
      
    }
    if (!user) {
      throw new NotFoundException('Could not find user. Please check the id.');
    }
    return user;
  }
}
