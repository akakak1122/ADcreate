import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class History {
  @Prop({
    type: String,
    required: true,
  })
  ip: string;
}

export type HistoryDocument = History & Document;

export const HistorySchema = SchemaFactory.createForClass(History);
