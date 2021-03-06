import { IsNotEmpty, IsUrl, ValidateIf } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  contentOutline: string;

  @ValidateIf((o) => o.firstPicture !== '')
  @IsUrl()
  firstPicture?: string;

  status?: string = 'publish';
  views?: number = 0;

  isShare?: boolean = true;
  isCommentOpen?: boolean = true;
  isTop?: boolean = false;
  likeNum?: number = 0;

  categoryId?: string;
  tagsId?: string[];
}
