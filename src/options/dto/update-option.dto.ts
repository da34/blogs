import { IsNotEmpty } from 'class-validator';

export class UpdateOptionDto {
  @IsNotEmpty()
  value: JSON;
}
