import { IsString } from 'class-validator';

export class CreateBlackDto {
  @IsString()
  readonly ip: string;
}
