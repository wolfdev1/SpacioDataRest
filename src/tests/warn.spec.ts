import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { messages } from '../consts/api.messages';
import { ModModule } from '../mod/mod.module';

describe('WarningsController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        AuthModule,
        ModModule,
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
        .get('/mod/warnings')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.NOT_FOUND)
        .expect({
            statusCode: HttpStatus.NOT_FOUND,
            message: messages.warnings.notFound,
            error: 'Not Found',
        }); 
    });

    it ('should return BAD REQUEST if no user id is given', () => {
        return request(app.getHttpServer())
        .get('/mod/warnings/user')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
            statusCode: HttpStatus.BAD_REQUEST,
            message: messages.warnings.badRequest,
            error: 'Bad Request',
        });
    });  
});