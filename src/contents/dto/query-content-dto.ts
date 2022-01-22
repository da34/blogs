import { PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../common/dto/find-limit-dto';

export class QueryContentDto extends PartialType(FindLimitDto) {
  status?: string = 'publish';
  type?: string = 'article';
}
