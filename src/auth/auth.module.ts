// auth.module
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsModule } from '../credentials/credentials.module';
import { AuthMiddleware } from './auth.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    CredentialsModule,
  ],
  providers: [AuthService, JwtService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .forRoutes('user', 'rank', 'mod', "channels");

  }
}

