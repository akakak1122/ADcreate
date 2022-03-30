import { Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDTO } from './dto/login.dto';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(userdto: LoginDTO): Promise<String> {
    const user = await this.userService.find(userdto.uid);
    if (user && await bcrypt.compare(userdto.password, user._hashed_password)) {
      return this.jwtService.sign(user.uid);
    }
    return;
  }
}
