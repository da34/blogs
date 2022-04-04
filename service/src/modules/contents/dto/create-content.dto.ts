import { IsNotEmpty, IsUrl, ValidateIf } from 'class-validator';
import { TypeContent } from '../entities/content.entity';

export class CreateContentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  description: string;

  @ValidateIf((o) => o.firstPicture !== '')
  @IsUrl()
  firstPicture?: string;

  status?: boolean;
  views?: number = 0;

  allowComment?: boolean = true;
  isTop?: boolean = false;
  likeNum?: number = 0;
}
