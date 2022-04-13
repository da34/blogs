import {
  IsEmail,
  IsNotEmpty,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(6)
  confirmPwd: string;

  @ValidateIf((s) => s.screenName !== '')
  @MaxLength(20)
  @MinLength(6)
  screenName?: string;

  @ValidateIf((s) => s.avatar !== '')
  @IsUrl()
  avatar?: string;

  @ValidateIf((s) => s.mail !== '')
  @IsEmail()
  mail?: string;
}
