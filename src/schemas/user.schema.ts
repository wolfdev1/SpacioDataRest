import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  avatar_url: string;

  @Prop()
  xp: number;
  level: number;
  
  @Prop()
  _id: false;
}

export const UserSchema = SchemaFactory.createForClass(User);