import { PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../../dto/find-limit-dto';

export class QueryContentDto extends PartialType(FindLimitDto) {
  status?: string = 'publish';
  title?: string;
}
