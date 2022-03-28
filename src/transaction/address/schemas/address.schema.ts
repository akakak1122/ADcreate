import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Address {
  @Prop({
    type: String,
    required: true,
  })
  owner: string;

  @Prop({
    type: String,
    required: true,
  })
  Roomname: string;

  @Prop({
    type: String,
  })
  mainURL: string;

  @Prop({
    type: String,
  })
  mobileURL: string;

  @Prop({
    type: String,
  })
  PCURL: string;

  @Prop({
    type: Array,
  })
  LPURL: string;

  @Prop({
    type: String,
  })
  newURL: string;
}

export type AddressDocument = Address & Document;

export const AddressSchema = SchemaFactory.createForClass(Address);
