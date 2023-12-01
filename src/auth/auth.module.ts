// Import necessary modules and classes
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsModule } from '../credentials/credentials.module';
import { AuthMiddleware } from './auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';

// Use the @Module decorator to define the module
@Module({
  // Import the CredentialsModule into this module
  imports: [
    CredentialsModule,
  ],
  // Define the controller for this module
  controllers: [
    AuthController
  ],
  // Define the AuthService and JwtService as providers that belong to this module
  providers: [
    AuthService,
    JwtService,
    PrismaService
  ],
})
// Implement the NestModule interface
export class AuthModule implements NestModule {
  // Define the configure method to set up middleware for certain routes
  configure(consumer: MiddlewareConsumer) {
    consumer
    // Apply the AuthMiddleware to the 'user', 'rank', 'mod', and 'channels' routes
    .apply(AuthMiddleware)
    .forRoutes('user', 'rank', 'mod', "channels");
  }
}