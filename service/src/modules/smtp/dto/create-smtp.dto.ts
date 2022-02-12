import { IsNotEmpty } from 'class-validator';

export class CreateSmtpDto {
  @IsNotEmpty()
  toEmail: string;

  @IsNotEmpty()
  fromEmail: string;

  @IsNotEmpty()
  text: string;

  subject?: string;
  isSuccess?: boolean;
}
