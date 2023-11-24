import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  logger.log(`Application listening on port ${process.env.PORT || 3000}`);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
