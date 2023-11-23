
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CredentialsService } from './credentials.service';
import { Credentials, CredentialsSchema } from '../schemas/credentials.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Credentials', schema: CredentialsSchema }])
  ],
  providers: [CredentialsService],
  exports: [CredentialsService],
})
export class CredentialsModule {}
