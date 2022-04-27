import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class History {
  @Prop({
    type: String,
    required: true,
  })
  ip: string;

  @Prop({
    type: String,
    required: true,
  })
  uuid: string;

  @Prop({
    type: String,
  })
  country?: string;

  @Prop({
    type: String,
  })
  city?: string;

  @Prop({
    type: String,
  })
  os?: string;

  @Prop({
    type: String,
  })
  browser?: string;

  @Prop({
    type: String,
  })
  source?: string;
}

export type HistoryDocument = History & Document;

export const HistorySchema = SchemaFactory.createForClass(History);
