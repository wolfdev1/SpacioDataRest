// Import necessary modules and classes
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

// Define the bootstrap function
async function bootstrap() {
  // Create a Nest application instance with the AppModule
  const app = await NestFactory.create(AppModule);
  
  // Create a new Logger instance with the 'Main' context
  const logger = new Logger('Main');
  
  // Log a message indicating the port the application is listening on
  logger.log(`Application listening on port ${process.env.PORT || 3000}`);
  
  // Start the application's network listener on the specified port
  await app.listen(process.env.PORT || 3000);
}

// Call the bootstrap function to start the application
bootstrap();