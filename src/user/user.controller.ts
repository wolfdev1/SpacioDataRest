// Import the necessary modules
import { BadRequestException, Controller, Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { messages } from '../consts/api.messages';
import { UserDto } from '../dto/user.dto';
import { PrismaService } from '../prisma.service';
import { users } from '@prisma/client';


// Use the @Controller decorator to define the route path
@Controller("user")
@Injectable()
export class UserController {
  // Constructor to inject the User model
  constructor(private prisma: PrismaService) {}

  // Default route to handle GET requests
  @Get()
  default(): any {
    // Throw a BadRequestException if the route is accessed without an ID
    throw new BadRequestException(messages.user.badRequest);
  }

  // Route to get a user by ID
  @Get(":id")
  async getUserById(@Param() params: any) {
    // Declare a variable to hold the user
    let user = null;
    try {
      // Try to find the user by ID
      user = await this.prisma.users.findFirst({ where: { userId: params.id } })
    } catch (error) {
      // If an error occurs, throw a NotFoundException
      throw new NotFoundException(messages.user.notFound);
    }
    // If no user is found, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(messages.user.notFound);
    }
    // Return the found user
    const xp: users = await user.xp.toString();
    return {
      userId: user.userId,
      name: user.name,
      avatar_url: user.avatar_url,
      xp: xp,
      level: user.level
    };
  }
}
