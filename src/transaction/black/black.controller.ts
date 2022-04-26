import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  HttpCode,
  Param,
  Post,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { CreateBlackDto } from './dto/create-black.dto';
import { UpdateBlackDto } from './dto/update-black.dto';

import { Black } from './schemas/black.schema';
import { BlackService } from './black.service';

import { CachingService } from '../caching';
import { AuthGuard } from '../auth';

@Controller('/api/black')
@UseGuards(AuthGuard)
export class BlackController {
  constructor(
    private readonly blackervice: BlackService,
    private cacheManager: CachingService,
    ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createBlackDto: CreateBlackDto,
  ): Promise<Black> {
    const black = await this.blackervice.create(createBlackDto);
    await this.cacheManager.set(`Black:${black.ip}`, true);
    return black;
  }

  @Get('/')
  @HttpCode(200)
  async find(): Promise<Black[]> {
    const blacks = await this.blackervice.findAll();
    const promises = blacks.map(black => this.cacheManager.set(`Black:${black.ip}`, true));
    await Promise.all(promises);
    return blacks;
  }

  @Get('/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.blackervice.find(id);
  }

  @Put('/:id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBlackDto: UpdateBlackDto,
  ): Promise<Black> {
    const black = await this.blackervice.update(id, updateBlackDto);
    await this.cacheManager.set(`Black:${black.ip}`, !black.ignored);
    return black;
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<any> {
    const black = await this.blackervice.delete(id);
    await this.cacheManager.del(`Black:${black.ip}`);
    return black;
  }
}
