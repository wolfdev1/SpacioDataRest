// Import necessary modules and classes
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Use the @Module decorator to define the module
@Module({
  // Import MongooseModule and configure it asynchronously
  imports: [
    MongooseModule.forRootAsync({
      // Import ConfigModule to use in the factory function
      imports: [ConfigModule],
      // Define a factory function that returns the configuration object for MongooseModule
      useFactory: async (configService: ConfigService) => ({
        // Get the MongoDB connection URI from the environment variables
        uri: configService.get<string>('MONGO_CONNECTION_URI'),
      }),
      // Inject ConfigService into the factory function
      inject: [ConfigService],
    }),
  ],
  // Export MongooseModule so that it can be imported in other modules
  exports: [MongooseModule],
})

// Export the module class
export class DatabaseModule {}