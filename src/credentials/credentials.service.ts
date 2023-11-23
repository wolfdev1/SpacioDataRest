import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Credentials } from '../schemas/credentials.schema';

@Injectable()
export class CredentialsService {
  constructor(@InjectModel('Credentials') private readonly credentialsModel: Model<Credentials>) {}

  async findOne(username: string): Promise<Credentials | undefined> {
    return this.credentialsModel.findOne({ username }).exec();
  }
}
