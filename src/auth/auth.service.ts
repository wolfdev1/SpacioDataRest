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

  async validateUser(username: string, pass: string): Promise<any> {
    const c = await this.credentialsService.findOne(username);
    if (c && await bcrypt.compare(pass, c.password)) {
      const { password, ...result } = c;
      return result;
    }
    return null;
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
