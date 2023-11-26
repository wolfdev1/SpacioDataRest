import { Test } from '@nestjs/testing';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { messages } from '../consts/api.messages';
import { UserModule } from '../user/user.module';

describe('UserController', () => {
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
      }, 5555)

    it('should return 400 if no user id is given', () => {
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

    it('should return 404 if user is not found', () => {
        return request(app.getHttpServer())
        .get('/user/123456789')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(404)
        .expect({
            statusCode: 404,
            message: messages.user.notFound,
            error: 'Not Found',
        });
    });

    it('should return 200 if user is found', async () => {
        return request(app.getHttpServer())
        .get('/user/947615854114263110')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(200)
        .expect({
            userId: '947615854114263110',
            name: 'Spacio',
            avatar_url: 'discord.com',
            xp: 9000,
            level: 25,
          });          
    });
});