import { IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  readonly owner: string;

  @IsString()
  readonly Roomname: string;

  @IsOptional()
  @IsString()
  readonly mainURL: string;

  @IsOptional()
  @IsString()
  readonly moblieURL: string;

  @IsOptional()
  @IsString()
  readonly PCURL: string;

  @IsOptional()
  @IsString()
  readonly LPURL: string;

  @IsOptional()
  @IsString()
  readonly newURL: string;
}
