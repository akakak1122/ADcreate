import { IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  readonly ip: string;

  @IsString()
  readonly country?: string;

  @IsString()
  readonly city?: string;

  @IsString()
  readonly os?: string;

  @IsString()
  readonly browser?: string;

  @IsString()
  readonly source?: string;
}
