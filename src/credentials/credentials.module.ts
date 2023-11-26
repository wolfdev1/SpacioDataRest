// Import necessary modules and classes
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CredentialsService } from './credentials.service';
import { Credentials, CredentialsSchema } from '../schemas/credentials.schema';

// Use the @Module decorator to define the module
@Module({
  // Import MongooseModule for database interaction and define the schema for 'Credentials'
  imports: [
    MongooseModule.forFeature([{ name: 'Credentials', schema: CredentialsSchema }])
  ],
  // Define the providers that should be instantiated for this module
  providers: [CredentialsService],
  // Export the CredentialsService so that it can be imported in other modules
  exports: [CredentialsService],
})

// Export the module class
export class CredentialsModule {}