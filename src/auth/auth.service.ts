// Import necessary modules and interfaces
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { messages } from '../consts/api.messages';
import { PrismaService } from '../prisma.service';

// Use the @Injectable decorator to allow this service to be injected into other classes
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // Inject the PrismaService
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
      await this.prisma.credentials.findFirst({where: {
        username: payload.username,
        password: payload.password
      }})
      // Return the payload if the user exists
      return payload;
    } catch (error) {
      // If an error occurs, throw an UnauthorizedException
      throw new UnauthorizedException(messages.jwt.invalid);
    }
  }

   /**
   * Method to log in a user and return a JWT token.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<any>} A promise that resolves to an object containing the status code, message, and JWT token.
   */
   async login(username: string, password: string): Promise<any> {

    // Find the user with the provided username and password
    const user = await this.prisma.credentials.findFirst({
      where: {
        username: username,
        password: password
      }
    });

    // If the user is not found, return an Unauthorized status code and message
    if (!user) {
      return {
        message: messages.jwt.invalid,
        statusCode: HttpStatus.UNAUTHORIZED,
      }
    }

    // If the provided password does not match the user's password, return an Unauthorized status code and message
    if (user.password !== password) {
      return {
        message: messages.jwt.invalid,
        statusCode: HttpStatus.UNAUTHORIZED
      }
    }

    // Create a payload with the user's username and password
    const payload = {
      username: user.username,
      password: user.password,
    }

    // Return a success status code, success message, and a signed JWT token
    return {
      statusCode: HttpStatus.OK,
      message: 'Authentication successful.',
      token: this.jwtService.sign(payload, {secret: process.env.JWT_SECRET}),
    };
  }
}