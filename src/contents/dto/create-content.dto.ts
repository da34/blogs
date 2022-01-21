import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateContentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  contentOutline: string;

  @IsNotEmpty()
  @IsUrl()
  firstPicture: string;

  type?: string = 'publish';
  views?: number = 0;

  shareStatement?: boolean = true;
  isCommentOpen?: boolean = true;
  isTop?: boolean = false;
  likeNum?: number = 0;
}
