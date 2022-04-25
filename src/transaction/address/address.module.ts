import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Address, AddressSchema } from './schemas/address.schema';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AuthModule } from '../auth';
import { HistoryModule } from '../history';
import { CachingModule } from '../caching';
import { BlackModule, BlackController } from '../black';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
    AuthModule,
    HistoryModule,
    CachingModule,
    BlackModule,
  ],
  controllers: [AddressController],
  providers: [AddressService, BlackController],
  exports: [AddressService],
})
export class AddressModule {}
