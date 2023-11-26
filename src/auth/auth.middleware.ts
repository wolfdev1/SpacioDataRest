import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized. Spacio REST Service requires authorization header');
    }
  
    const token = authHeader.split(' ')[0];
    
    const payloadOrError = await this.authService.decode(token);
    if (payloadOrError instanceof UnauthorizedException) {
      throw payloadOrError;
    }
  
    next();
  }
}
