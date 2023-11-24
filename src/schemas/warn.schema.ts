import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WarnDocument = HydratedDocument<Warn>;

@Schema()
export class Warn {
  @Prop()
  userId: string;

  @Prop()
  reason: string;

  @Prop()
  warnId: string;

  @Prop()
  modId: string;
  
  @Prop()
  _id: false;
}

export const WarnSchema = SchemaFactory.createForClass(Warn);