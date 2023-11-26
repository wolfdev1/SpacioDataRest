import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Credentials } from '../schemas/credentials.schema';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
export class CredentialsService {
  // Inject the Credentials model into the service
  constructor(@InjectModel('Credentials') private readonly credentialsModel: Model<Credentials>) {}

  // Method to find a user by username
  async findOne(username: string): Promise<Credentials | undefined> {
    // Validate the username before querying the database
    if (!username || typeof username !== 'string') {
      throw new BadRequestException('Invalid username');
    }

    // Use try-catch to handle any potential mongoose errors
    try {
      // Query the database for a user with the provided username
      return await this.credentialsModel.findOne({ username }).exec();
    } catch (error) {
      // Log the error and rethrow it
      console.error(`Error occurred while fetching credentials for username ${username}: ${error}`);
      throw error;
    }
  }
}