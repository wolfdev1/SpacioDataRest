// Import necessary modules and constants
import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { messages } from '../consts/api.messages';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

// Decorator to mark the class as a provider
@Injectable()
export class RankService {
  // Inject the User model into the service
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Method to return a default message and status
  async getDefault(): Promise<any> {
    // Return a default message and status
    return {
      message: messages.rank.badRequest,
      status: HttpStatus.BAD_REQUEST 
    };
  }

  // Method to get a user by ID
  async getUserById(id: string): Promise<User> {
    // Return the user found by the provided ID
    return this.userModel.findOne({ userId: id }).exec();
  }
}