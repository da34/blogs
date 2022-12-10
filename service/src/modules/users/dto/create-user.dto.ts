import { IsNotEmpty, MaxLength, MinLength, Equals } from 'class-validator';

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
}
