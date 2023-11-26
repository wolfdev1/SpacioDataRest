import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsService } from '../credentials/credentials.service';
import { Credentials } from '../interfaces/credentials.interface';
import { messages } from '../consts/api.messages';

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
      return new UnauthorizedException(messages.jwt.invalidPayload);
    } catch (e) {
      return new UnauthorizedException(messages.jwt.invalid);
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
