import { Test } from '@nestjs/testing';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { messages } from '../consts/api.messages';
import { UserModule } from '../user/user.module';

describe('AuthMiddleware', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        AuthModule,
        UserModule,
        DatabaseModule
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  })

  it('should throw UnauthorizedException if no authorization header is present', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(401)
      .expect({
        statusCode: 401,
        message: messages.jwt.unauthorized,
        error: 'Unauthorized',
      });
  });

  it('should return 400 if a valid token is provided but no user id is given', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', process.env.JWT_TOKEN)
      .expect(400)
      .expect({
        statusCode: 400,
        message: messages.user.badRequest,
        error: 'Bad Request',
      });
  });

  it('should throw UnauthorizedException if token is invalid', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', "qwertyuiopasdfghjklzxcvbnm")
      .expect(401)
      .expect({
        statusCode: 401,
        message: messages.jwt.invalid,
        error: 'Unauthorized',
      });
  });

  it('should return UnauthorizedException if token signature is valid but payload is invalid', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', process.env.INVALID_JWT_TOKEN)
      .expect(401)
      .expect({
        statusCode: 401,
        message: messages.jwt.invalidPayload,
        error: 'Unauthorized',
      });
  })
});