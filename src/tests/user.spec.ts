import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication, UnauthorizedException } from '@nestjs/common';
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

    it('should return BAD REQUEST if no user id is given', () => {
        return request(app.getHttpServer())
        .get('/user')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
            statusCode: HttpStatus.BAD_REQUEST,
            message: messages.user.badRequest,
            error: 'Bad Request',
        });
    });

    it('should return NOT FOUND if user not found', () => {
        return request(app.getHttpServer())
        .get('/user/123456789')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
            statusCode: HttpStatus.NOT_FOUND,
            message: messages.user.notFound,
            error: 'Not Found',
        });
    });

    it('should return OK if user is found', async () => {
        return request(app.getHttpServer())
        .get('/user/947615854114263110')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.OK)
        .expect({
            userId: '947615854114263110',
            name: 'Spacio',
            avatar_url: 'discord.com',
            xp: 9000,
            level: 25,
          });          
    });
});