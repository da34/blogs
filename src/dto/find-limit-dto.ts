import { IsNotEmpty } from 'class-validator';

export class FindLimitDto {
  page?: number = 1;

  pageSize?: number = 10;
}
