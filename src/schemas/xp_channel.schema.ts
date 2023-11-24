import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type XpChannelDocument = HydratedDocument<XpChannel>;

@Schema()
export class XpChannel {
  @Prop()
  id: string;
  @Prop()
  _id: false;
  
}

export const XpChannelSchema = SchemaFactory.createForClass(XpChannel);