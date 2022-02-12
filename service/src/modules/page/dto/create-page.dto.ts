import { IsNotEmpty } from 'class-validator';

export class CreatePageDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  content: string;

  status?: string;
  order?: number;
}
