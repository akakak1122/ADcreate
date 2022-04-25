import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, AddressDocument } from './schemas/address.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<AddressDocument>,
  ) {}

  async create(addressdto: CreateAddressDto): Promise<Address> {
    const address = {
      ...addressdto,
    };
    const result = await this.addressModel.create(address);

    return result;
  }

  async findAll(): Promise<Address[]> {
    const addresss = await this.addressModel.find().sort({ createdAt: -1 });

    return addresss;
  }

  async find(url: string): Promise<Address> {
    const address = await this.addressModel.findOne({ newURL: url });
    if (!address) {
      throw new Error('없는 주소입니다.');
    }

    return address;
  }

  async update(id: string, addressdto: UpdateAddressDto): Promise<Address> {
    const address = await this.addressModel.findOne({ _id: id });
    if (!address) {
      throw new Error('없는 주소입니다.');
    }

    const result = await this.addressModel.findOneAndUpdate(
      { _id: id },
      addressdto,
    );

    return result;
  }

  async delete(id: string): Promise<Address> {
    const address = await this.addressModel.findOne({ _id: id });
    if (!address) {
      throw new Error('없는 주소입니다.');
    }
    const result = await this.addressModel.findOneAndDelete({ _id: id });

    return result;
  }
}
