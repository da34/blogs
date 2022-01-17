import { PartialType } from '@nestjs/swagger';
import { CreateClassifyDto } from './create-classify.dto';

export class UpdateClassifyDto extends PartialType(CreateClassifyDto) {}
