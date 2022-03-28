import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Black {
  @Prop({
    type: String,
    required: true,
  })
  ip: string;
}

export type BlackDocument = Black & Document;

export const BlackSchema = SchemaFactory.createForClass(Black);
