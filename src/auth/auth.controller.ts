// Import necessary modules and classes
import { Controller, Get, BadRequestException, Body, Post, Res } from '@nestjs/common';
import { messages } from '../consts/api.messages';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';

@Controller('auth')
/**
 * AuthController is a controller that handles authentication-related requests.
 */
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  /**
   * Default GET method that throws a BadRequestException.
   * @returns {Promise<any>} A promise that resolves to a BadRequestException.
   */
  async default(): Promise<any> {
    throw new BadRequestException(messages.auth.default);
  }

  @Get('login')
  /**
   * GET method for the login route that throws a BadRequestException.
   * @returns {Promise<any>} A promise that resolves to a BadRequestException.
   */
  async login(): Promise<any> {
    throw new BadRequestException(messages.auth.default);
  }
  
  @Post('login')
  /**
   * POST method for the login route that authenticates a user and returns a JWT token.
   * @param {LoginDto} loginDto - The login data transfer object containing the username and password.
   * @param {Response} res - The Express.js response object.
   * @returns {Promise<any>} A promise that resolves to an object containing the status code, message, and JWT token.
   */
  async loginPost(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
    console.log(loginDto);
    const d = await this.authService.login(loginDto.username, loginDto.password);

    res.status(d.statusCode).json({
      message: d.message,
      status: d.statusCode,
      ...(d.token && d.token.trim() !== '' && { token: d.token })
    });
  }
}