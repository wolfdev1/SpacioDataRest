import { Test } from '@nestjs/testing';
import { INestApplication, Injectable, UnauthorizedException } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { messages } from '../consts/api.messages';
import { ChannelModule } from '../channels/channel.module';
import mongoose from 'mongoose';

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
        it(`should return 200 for ${testCase} channel endpoint`, async () => {
            return request(app.getHttpServer())
            .get(`/channels/${testCase}`)
            .set('Authorization', process.env.JWT_TOKEN)
            .expect(200)
            });
    });

    it('should return 400 if no channel id is given', () => {
        return request(app.getHttpServer())
        .get('/channels')
        .set('Authorization', process.env.JWT_TOKEN)
        .expect(400)
        .expect({
            message: messages.channel.badRequest,
        });
      });    
    });
  
