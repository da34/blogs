import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCommentDto {
  ip: string;

  @IsNotEmpty()
  @MaxLength(200)
  text: string;

  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  putTop?: boolean = false;

  @IsNotEmpty()
  cid: number;

  status?: string;
}
