import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuildChannelDocument = HydratedDocument<GuildChannel>;

@Schema()
export class GuildChannel {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  private: boolean;

  @Prop()
  nsfw: boolean;

  @Prop()
  slowmode: number;

  @Prop()
  topic: string;

  @Prop()
  position: number;

  @Prop()
  parent_id: string;

  @Prop()
  parent_name: string;

  @Prop()
  type: string;

  @Prop()
  time_created: string;
}

export const GuildChannelSchema = SchemaFactory.createForClass(GuildChannel);