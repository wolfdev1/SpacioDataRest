import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CredentialsDocument = HydratedDocument<Credentials>;

@Schema()
export class Credentials {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  perms: string;
  
}

export const CredentialsSchema = SchemaFactory.createForClass(Credentials);