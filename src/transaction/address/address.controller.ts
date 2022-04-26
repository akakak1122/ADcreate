import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

import { Address } from './schemas/address.schema';
import { AddressService } from './address.service';

import { AuthGuard } from '../auth';

import { HistoryService } from '../history';
import { CachingService } from '../caching';
import { BlackController } from '../black';

import * as moment from 'moment';
import { lookup } from 'geoip-lite';

@Controller('/api/address')
export class AddressController {
  constructor(
    private readonly addresservice: AddressService,
    private historyservice: HistoryService,
    private cacheManager: CachingService,
    private blackcontroller: BlackController,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    const address = await this.addresservice.create(createAddressDto);

    return address;
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async find(): Promise<Address[]> {
    return this.addresservice.findAll();
  }

  @Get('/:url')
  @HttpCode(200)
  async findOne(@Param('url') url: string, @Req() req): Promise<any> {
    const agent = req.useragent;
    const address = await this.addresservice.find(url);

    const blacked = await this.cacheManager.get(`Black:${req.clientIp}`);
    if (blacked) return address.PCURL;

    const retryip = await this.cacheManager.get(`IP:${req.clientIp}`);

    let isReset = null;
    if (blacked !== false && retryip) {
      const diff = moment().diff(retryip.time);
      if (diff > Number(process.env.IP_RETRY_BLACK_TIME)) isReset = { time: new Date(), cnt: 1 };
      else if (retryip.cnt < Number(process.env.IP_RETRY_BLACK_CNT)) {
        isReset = { time: retryip.time, cnt: retryip.cnt + 1 };
      } else {
        await this.blackcontroller.create({ ip: req.clientIp });
      }
    } else isReset = { time: new Date(), cnt: 1 };
    if (isReset) {
      await this.cacheManager.set(`IP:${req.clientIp}`, isReset);
    }

    const geo = lookup(req.clientIp);
    await this.historyservice.create({
      ip: req.clientIp,
      country: geo?.country,
      city: geo?.city,
      os: agent.os,
      browser: agent.browser,
      source: agent.source,
    });

    let redirect = address.mobileURL;
    const isWeb = [
      'isDesktop',
      'isChrome',
      'isSafari',
      'isIE',
      'isOpera',
      'isEdge',
      'isFirefox',
    ];
    if (/; wv/.test(agent.source)) {
      redirect = address.LPURL;
    } else if (isWeb.find((key: string) => agent[key])) {
      redirect = address.PCURL;
    } else if (agent.isMobile) {
      redirect = address.mobileURL;
    }
    return redirect;
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAddressDto: UpdateAddressDto,
  ): Promise<any> {
    return this.addresservice.update(id, updateAddressDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<any> {
    return this.addresservice.delete(id);
  }
}
