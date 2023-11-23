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

    try {
      const username = authHeader.split(' ')[1];
      const pass = authHeader.split(' ')[2];
      
      const payload = await this.authService.validateUser(username, pass);
      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }
      req['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }
}
