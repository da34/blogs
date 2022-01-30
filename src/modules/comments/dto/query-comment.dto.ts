import { PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../../dto/find-limit-dto';

export class QueryCommentDto extends PartialType(FindLimitDto) {
  contentId?: string;
}
