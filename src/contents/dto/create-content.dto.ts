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
  type?: string = 'article';
  views?: number = 0;

  shareStatement?: boolean = true;
  isCommentOpen?: boolean = true;
  isTop?: boolean = false;
  likeNum?: number = 0;

  categoryId?: string;
  tagsId?: string[];
}
