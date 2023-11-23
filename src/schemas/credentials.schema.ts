import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CredentialsDocument = HydratedDocument<Credentials>;

@Schema()
export class Credentials {
  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop({ type: { user: Boolean, rank: Boolean, mod: Boolean, roles: Boolean, channels: Boolean } })
  perms: {
    user: boolean,
    rank: boolean,
    mod: boolean,
    roles: boolean,
    channels: boolean,
  }
  

}

export const CredentialsSchema = SchemaFactory.createForClass(Credentials);