import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Address, AddressSchema } from './schemas/address.schema';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AuthModule } from '../auth';
import { HistoryModule } from '../history';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    AuthModule,
    HistoryModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
