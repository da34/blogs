import { IsNotEmpty, IsUrl, ValidateIf } from 'class-validator';

export class CreateContentDto {
  title?: string;

  text?: string;

  @ValidateIf((o) => o.coverImage)
  @IsUrl()
  coverImage?: string;

  status?: boolean;
  views?: number = 0;

  allowComment?: boolean = true;
  isTop?: boolean = false;
  likeNum?: number = 0;

  tagsId?: number[];

  categoryId?: number;
}
