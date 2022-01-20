import { PartialType } from '@nestjs/swagger';
import { FindLimitDto } from '../../common/dto/find-limit-dto';

export class QueryLinkDto extends PartialType(FindLimitDto) {}
