// app.service.ts
import { Injectable } from '@nestjs/common';
import { version } from './projectInfo';

@Injectable()
export class AppService {
  getHello(): { message: string, status: number } {
    return { message: `Spacio REST Service running correctly on version ${version}`, status: 200 };
  }
}
