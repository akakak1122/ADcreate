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
} from '@nestjs/common';

import { CreateBlackDto } from './dto/create-black.dto';

import { Black } from './schemas/black.schema';
import { BlackService } from './black.service';

@Controller('/black')
export class BlackController {
  constructor(private readonly blackervice: BlackService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createBlackDto: CreateBlackDto,
  ): Promise<Black> {
    const black = await this.blackervice.create(createBlackDto);

    return black;
  }

  @Get('/')
  @HttpCode(200)
  async find(): Promise<Black[]> {
    return this.blackervice.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.blackervice.find(id);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id') id: string): Promise<any> {
    return this.blackervice.delete(id);
  }
}
