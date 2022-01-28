import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  ip: string;
  ua: string;

  @IsNotEmpty()
  text: string;

  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  nickName: string;

  targetName?: string;

  putTop?: boolean = false;
  suggestion?: string;

  pid?: string;
  status?: string;

  // 层级id
  tierId?: string;

  contentId?: string;
}
