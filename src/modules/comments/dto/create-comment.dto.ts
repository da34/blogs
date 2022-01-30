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
  name: string;

  replyName?: string;
  replyEmail?: string;

  putTop?: boolean = false;
  suggestion?: string;

  pid?: string;
  status?: string;

  @IsNotEmpty()
  postId: string;

  isAdmin?: boolean = false;
}
