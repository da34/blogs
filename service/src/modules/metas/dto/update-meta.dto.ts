import { PartialType } from '@nestjs/swagger';
import { CreateMetaDto } from './create-meta.dto';

export class UpdateMetaDto extends PartialType(CreateMetaDto) {}
