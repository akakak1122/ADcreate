import { IsBoolean, IsString } from 'class-validator';

export class CreateBlackDto {
  @IsString()
  readonly ip?: string;

  @IsString()
  readonly uuid?: string;

  @IsBoolean()
  readonly ignored?: boolean;
}
