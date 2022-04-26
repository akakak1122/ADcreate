import { IsBoolean } from 'class-validator';

export class UpdateBlackDto {
  @IsBoolean()
  readonly ignored?: boolean;
}
