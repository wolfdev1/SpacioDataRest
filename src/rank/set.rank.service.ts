// Import necessary modules and constants
import { HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { messages } from 'src/consts/api.messages';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { XP_LEVEL_RATIO } from '../consts/other';

// Decorator to mark the class as a provider
@Injectable()
export class SetService {
  // Logger instance for logging
  private readonly logger = new Logger("Rank");

  // Inject the User model into the service
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Method to set XP for a user
  async setXp(userId: string, xp: number): Promise<any> {
    // Validate the userId and xp to prevent memory leaks
    if (!userId || typeof userId !== 'string' || typeof xp !== 'number' || xp < 0) {
      throw new BadRequestException('Invalid user ID or XP');
    }

    // Find the user with the provided userId
    const user = await this.userModel.findOne({ userId }).exec();
    // If user not found, throw NotFoundException
    if (!user) {
      throw new NotFoundException(messages.rank.notFound);
    }

    // Calculate the level based on the provided xp and XP_LEVEL_RATIO
    const level = Math.floor(xp / XP_LEVEL_RATIO);

    try {
      // Update the user's XP and level in the database
      const updateResult = await this.userModel.updateOne(
        { userId },
        { xp, level }
      ).exec();

      // If update was successful
      if (updateResult.modifiedCount > 0) {
        // Log the update
        this.logger.log(`User ${userId} XP set to ${xp} (Level ${level}).`);

        // Return a message with the updated XP and level
        return {
          message: `User ${userId} XP set to ${xp} (Level ${level}).`,
          status: HttpStatus.OK
        };
      } else {
        // If update failed, throw an InternalServerErrorException
        throw new InternalServerErrorException(messages.rank.internalServerError);
      }
    } catch (error) {
      // Log the error
      this.logger.error(`Error updating XP for user ${userId}: ${error.message}`);
      // Throw a generic error
      throw new Error("Failed to update user XP.");
    }
  }
}      