// Import necessary modules and constants
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

// Decorator to mark the class as a provider
@Injectable()
export class LeaderboardService {
  // Inject the User model into the service
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Method to get the leaderboard
  async getLeaderboard(limit?: number): Promise<{ [key: number]: User }> {
    // Validate the limits to prevent memory leaks
    if (limit && (typeof limit !== 'number' || limit <= 0)) {
      throw new BadRequestException('Invalid limit');
    }

    // Find users, sort them by level and XP in descending order, limit the results if a limit is provided, and execute the query
    const users = await this.userModel.find().sort({ level: -1, xp: -1 }).limit(limit).exec();

    // Reduce the users array to an object with the rank as the key and the user as the value
    return users.reduce((leaderboard, user, index) => ({
      ...leaderboard, 
      [(index + 1)]: user.toObject() // Convert the Mongoose document to a plain object
    }), {});
  }
}