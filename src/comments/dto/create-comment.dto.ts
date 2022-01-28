import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  ip: string;
  ua: string;

  @IsNotEmpty()
  @MaxLength(200)
  text: string;

  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @MaxLength(20)
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
