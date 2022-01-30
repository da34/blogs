import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  @IsNotEmpty()
  date: number;

  @IsArray()
  @IsNotEmpty()
  desc;
}
