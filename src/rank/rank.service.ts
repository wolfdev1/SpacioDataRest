// Import necessary modules and constants
import { HttpStatus, Injectable} from '@nestjs/common';
import { messages } from '../consts/api.messages';
import { PrismaService } from '../prisma.service';
import type { users } from '@prisma/client';


// Decorator to mark the class as a provider
@Injectable()
export class RankService {
  // Inject the User model into the service
  constructor(private prisma: PrismaService) {}

  // Method to return a default message and status
  async getDefault(): Promise<any> {
    // Return a default message and status
    return {
      message: messages.rank.badRequest,
      status: HttpStatus.BAD_REQUEST 
    };
  }

  // Method to get a user by ID
  async getUserById(id: string): Promise<users> {
    // Return the user found by the provided ID
    return this.prisma.users.findFirst({
      where: { userId: id }
    })
  }
}