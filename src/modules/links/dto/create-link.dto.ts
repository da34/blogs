import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty()
  readonly avatar: string;

  @IsNotEmpty()
  readonly outline: string;

  @IsUrl()
  @IsNotEmpty()
  readonly URL: string;

  @IsNotEmpty()
  readonly name: string;
}
