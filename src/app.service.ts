import { Injectable, Logger } from '@nestjs/common';

import { version } from './projectInfo';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): { message: string, status: number } {
    this.logger.log('Client requested root endpoint (/) with GET method');
    return { message: `Spacio REST Service running correctly on version ${version}`, status: 200 };
  }
}
