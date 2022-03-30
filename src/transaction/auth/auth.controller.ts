import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { LoginDTO } from './dto/login.dto';

import { AuthService } from './auth.service';

@Controller('/api/login')
export class AuthController {
  constructor(
    private readonly authservice: AuthService,
    ) {}

  @Post()
  @HttpCode(201)
  async login(
    @Body(ValidationPipe) loginDto: LoginDTO,
  ): Promise<String> {
    const token = await this.authservice.login(loginDto);
    return token;
  }
}
