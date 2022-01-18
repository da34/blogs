import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  @IsString()
  readonly avatar: string;

  @IsNotEmpty()
  @IsString()
  readonly outline: string;

  @IsNotEmpty()
  @IsString()
  readonly URL: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
