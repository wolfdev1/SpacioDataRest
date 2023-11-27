import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { messages } from '../consts/api.messages';
import { ChannelModule } from '../channels/channel.module';

describe('ChannelController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        AuthModule,
        ChannelModule,
        DatabaseModule
      ],
    }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    const testCases = ['guild', 'bot', 'xp']
    testCases.forEach((testCase) => {
        it(`should return OK for ${testCase} channel endpoint`, async () => {
            return request(app.getHttpServer())
            .get(`/channels/${testCase}`)
            .set('Authorization', process.env.JWT_TOKEN)
            .expect(HttpStatus.OK)
            });
    });

    it('should return BAD REQUEST if no channel id is given', () => {
        return request(app.getHttpServer())
        .get('/channels')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
            statusCode: HttpStatus.BAD_REQUEST,
            message: messages.channel.badRequest,
            error: 'Bad Request',
        });
      });    
    
    it('should return BAD REQUEST if id is invalid', () => {
        return request(app.getHttpServer())
        .put('/channels/xp')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
            statusCode: HttpStatus.BAD_REQUEST,
            message: messages.channel.badRequest3,
            error: 'Bad Request',
        });
      });  

    it('should return BAD REQUEST if id/name is invalid', () => {
        return request(app.getHttpServer())
        .put('/channels/xp')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
            statusCode: HttpStatus.BAD_REQUEST,
            message: messages.channel.badRequest3,
            error: 'Bad Request',
        });
    });
});
