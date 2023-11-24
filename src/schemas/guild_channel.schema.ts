import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuildChannelDocument = HydratedDocument<GuildChannel>;

@Schema()
export class GuildChannel {
  @Prop()
  name: string;

  @Prop()
  id: string;

  @Prop()
  isPrivate: boolean;
}

export const GuildChannelSchema = SchemaFactory.createForClass(GuildChannel);