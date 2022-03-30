import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { access_token } = request.headers;
    return access_token && this.jwtService.verify(access_token) ? true : false;
  }
}
