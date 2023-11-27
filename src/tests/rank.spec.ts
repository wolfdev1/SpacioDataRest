import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { messages } from '../consts/api.messages';
import { RankModule } from '../rank/rank.module';

describe('RankController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        AuthModule,
        RankModule,
        DatabaseModule
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  })

  it('should return 200', () => {
    return request(app.getHttpServer())
      .get('/rank/leaderboard')
      .set('Authorization', process.env.JWT_TOKEN)
      .expect(HttpStatus.OK)
  });

    it('should return METHOD_NOT_ALLOWED', () => {
        return request(app.getHttpServer())
        .get('/rank/user/resetxp')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.METHOD_NOT_ALLOWED)
        .expect({
            statusCode: HttpStatus.METHOD_NOT_ALLOWED,
            message: messages.general.notAllowed,
            error: 'Method Not Allowed',
        })
    })

    it('should return METHOD NOT ALLOWED', () => {
        return request(app.getHttpServer())
        .get('/rank/user/setxp')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.METHOD_NOT_ALLOWED)
        .expect({
            statusCode: HttpStatus.METHOD_NOT_ALLOWED,
            message: messages.general.notAllowed,
            error: 'Method Not Allowed',
        })
    })

    it('should return BAD REQUEST', () => {
        return request(app.getHttpServer())
        .put('/rank/user/setxp')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
            statusCode: HttpStatus.BAD_REQUEST,
            message: messages.rank.badRequest2,
            error: 'Bad Request',
        })
    })

    it('should return NOT FOUND', () => {
        return request(app.getHttpServer())
        .put('/rank/user/setxp?userId=qwerty&xp=100')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
            statusCode: HttpStatus.NOT_FOUND,
            message: messages.rank.notFound,
            error: 'Not Found',
        })
    });

    it('should return BAD REQUEST', () => {
        return request(app.getHttpServer())
        .put('/rank/user/resetxp')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
            statusCode: HttpStatus.BAD_REQUEST,
            message: messages.rank.badRequest3,
            error: 'Bad Request',
        })
    })

    it('should return NOT FOUND', () => {
        return request(app.getHttpServer())
        .put('/rank/user/resetxp?userId=0')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
            statusCode: HttpStatus.NOT_FOUND,
            message: messages.rank.notFound,
            error: 'Not Found',
        })
    });
});
