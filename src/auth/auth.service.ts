import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsService } from '../credentials/credentials.service';
import { Credentials } from '../interfaces/credentials.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private credentialsService: CredentialsService,
    private jwtService: JwtService
  ) {}

  async decode(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token, {secret: process.env.JWT_SECRET});

      const c = await this.credentialsService.findOne(payload.username);
      if (c) {
        return payload;
      }
      return new UnauthorizedException('Unauthorized. Token sign appears to be valid but user does not exist');
    } catch (e) {
      return null;
    }
  }

  async login(credentials: Credentials) {
    const payload = {
        username: credentials.username,
        password: credentials.password,
        perms: credentials.perms 
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
