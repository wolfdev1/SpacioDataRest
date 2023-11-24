import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CredentialsModule } from './credentials/credentials.module';
import { RankModule } from './rank/rank.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ModModule } from './mod/mod.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    UserModule,
    AuthModule,
    CredentialsModule,
    RankModule,
    DatabaseModule,
    ModModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}