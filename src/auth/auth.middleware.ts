// Import necessary modules and classes
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { messages } from '../consts/api.messages';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
// Implement the NestMiddleware interface
export class AuthMiddleware implements NestMiddleware {
  // Inject the AuthService into the middleware
  constructor(private authService: AuthService) {}

  // Define the middleware function
  async use(req: Request, res: Response, next: NextFunction) {
    // Extract the authorization header from the request
    const authHeader = req.headers['authorization'];
    
    // If the authorization header is not present, throw an UnauthorizedException
    if (!authHeader) {
      throw new UnauthorizedException(messages.jwt.unauthorized);
    }
  
    // Split the authorization header to extract the token
    const token = authHeader.split(' ')[0];
    
    // Decode the token using the AuthService
    const payloadOrError = await this.authService.decode(token);
    // If the decode method returns an UnauthorizedException, throw it
    if (payloadOrError instanceof UnauthorizedException) {
      throw payloadOrError;
    }
  
    // Call the next middleware in the stack
    next();
  }
}