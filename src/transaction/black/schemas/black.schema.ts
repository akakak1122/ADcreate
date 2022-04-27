import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Black {
  @Prop({
    type: String,
    required: false,
  })
  ip: string;

  @Prop({
    type: String,
    required: false,
  })
  uuid: string;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  ignored: boolean;
}

export type BlackDocument = Black & Document;

export const BlackSchema = SchemaFactory.createForClass(Black);
