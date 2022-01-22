import { PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../common/dto/find-limit-dto';

export class QueryCommentDto extends PartialType(FindLimitDto) {
  contentId?: string;
}
