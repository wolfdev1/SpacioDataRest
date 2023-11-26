// Import necessary modules and classes
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';

// Use the @Module decorator to define the module
@Module({
  // Import the MongooseModule and define the User model with the UserSchema
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  // Define the controllers that belong to this module
  controllers: [ UserController],
  // Define the providers that belong to this module
  providers: [],
})
// Export the UserModule class
export class UserModule  {}