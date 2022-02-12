import { PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../../dto/find-limit-dto';

export class QueryCommentDto extends PartialType(FindLimitDto) {
  anchor?: string;
  ip?: string;
  name?: string;
  status?: string;
  sortBy?: object;
}
