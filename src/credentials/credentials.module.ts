// Import necessary modules and classes
import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { PrismaService } from '../prisma.service';

// Use the @Module decorator to define the module
@Module({
  // Import MongooseModule for database interaction and define the schema for 'Credentials'
  imports: [
  ],
  // Define the providers that should be instantiated for this module
  providers: [
    CredentialsService,
    PrismaService
  ],
  // Export the CredentialsService so that it can be imported in other modules
  exports: [CredentialsService],
})

// Export the module class
export class CredentialsModule {}