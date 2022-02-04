import { IsNotEmpty } from 'class-validator';

export class CreateSmtpDto {
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  form: string;

  @IsNotEmpty()
  text: string;

  subject?: string;
  isSuccess?: boolean;
}
