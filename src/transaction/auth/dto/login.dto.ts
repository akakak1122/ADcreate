import { IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  readonly uid: string;

  @IsString()
  readonly password: string;
}
