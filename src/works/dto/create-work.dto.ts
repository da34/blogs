import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateWorkDto {
  @IsUrl()
  @IsNotEmpty()
  imgUrl: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  desc: string;

  priority?: number = 0;

  @IsUrl()
  linkUrl?: string;

  @IsUrl()
  sourceUrl?: string;
}
