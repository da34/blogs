import { IsNotEmpty } from 'class-validator';

export class FindLimitDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  pageSize: number;
}
