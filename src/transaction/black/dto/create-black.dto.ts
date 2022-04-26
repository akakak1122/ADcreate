import { IsBoolean, IsString } from 'class-validator';

export class CreateBlackDto {
  @IsString()
  readonly ip: string;

  @IsBoolean()
  readonly ignored?: boolean;
}
