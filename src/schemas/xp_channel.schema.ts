import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type XpChannelDocument = HydratedDocument<XpChannel>;

@Schema()
export class XpChannel {
  @Prop()
  id: string;

  
}

export const XpChannelSchema = SchemaFactory.createForClass(XpChannel);