// Import the necessary modules
import { BadRequestException, Controller, Get, Injectable, NotFoundException, Param, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { messages } from '../consts/api.messages';
import { UserDto } from '../dto/user.dto';


// Use the @Controller decorator to define the route path
@Controller("user")
@Injectable()
export class UserController {
  // Constructor to inject the User model
  constructor(@InjectModel('User') private readonly userModel: Model<UserDto>) {}

  // Default route to handle GET requests
  @Get()
  default(): any {
    // Throw a BadRequestException if the route is accessed without an ID
    throw new BadRequestException(messages.user.badRequest);
  }

  // Route to get a user by ID
  @Get(":id")
  async getUserById(@Param() params: any): Promise<UserDto> {
    // Declare a variable to hold the user
    let user: UserDto | PromiseLike<UserDto>;
    try {
      // Try to find the user by ID
      user = await this.userModel.findOne({userId: params.id}).exec();
    } catch (error) {
      // If an error occurs, throw a NotFoundException
      throw new NotFoundException(messages.user.notFound);
    }
    // If no user is found, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(messages.user.notFound);
    }
    // Return the found user
    return user;
  }
}
