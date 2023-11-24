import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BotChannelDocument = HydratedDocument<BotChannel>;

@Schema()
export class BotChannel {
  @Prop()
  name: string;

  @Prop()
  id: string;

  @Prop()
  _id: false;
}

export const BotChannelSchema = SchemaFactory.createForClass(BotChannel);