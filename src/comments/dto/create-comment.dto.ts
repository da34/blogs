import { IsEmail, IsIP, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsIP()
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

  pid?: string;
}
