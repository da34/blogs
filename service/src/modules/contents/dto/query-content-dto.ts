import { PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../../common/dto/find-limit-dto';

export class QueryContentDto extends PartialType(FindLimitDto) {
  status?: boolean;
  title?: string;
  sortBy?: object;
  type?: object;
}
