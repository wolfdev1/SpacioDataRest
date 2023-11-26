// Import necessary modules and interfaces
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsService } from '../credentials/credentials.service';
import { Credentials } from '../interfaces/credentials.interface';
import { messages } from '../consts/api.messages';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
export class AuthService {
  constructor(
    private credentialsService: CredentialsService, // Inject the CredentialsService
    private jwtService: JwtService // Inject the JwtService
  ) {}

  // Method to decode a JWT token
  async decode(token: string): Promise<any> {
    // Validate the token before decoding
    if (!token) {
      throw new UnauthorizedException(messages.jwt.invalid);
    }

    try {
      // Decode the token using the JwtService
      const payload = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});

      // Validate the payload by checking if the user exists
      await this.credentialsService.findOne(payload.username);
      // Return the payload if the user exists
      return payload;
    } catch (error) {
      // If an error occurs, throw an UnauthorizedException
      throw new UnauthorizedException(messages.jwt.invalid);
    }
  }

  // Method to log in a user and return a JWT token
  async login(credentials: Credentials) {
    // Validate the credentials before signing the token
    if (!credentials || typeof credentials !== 'object') {
      throw new UnauthorizedException(messages.jwt.invalid);
    }

    const payload = {
      username: credentials.username,
      password: credentials.password,
      perms: credentials.perms 
    }

    // Return the signed token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}