import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateHistoryDto {
  @IsNotEmpty()
  date: string;

  @IsArray()
  @IsNotEmpty()
  desc;
}
