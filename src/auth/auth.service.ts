import { Injectable } from '@nestjs/common';
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
      const payload = this.jwtService.decode(token) as any;
      console.log(payload);

      const c = await this.credentialsService.findOne(payload.username);
      if (c) {
        return payload;
      }
      return null;
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
