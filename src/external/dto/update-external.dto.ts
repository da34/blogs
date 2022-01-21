import { PartialType } from '@nestjs/swagger';
import { CreateExternalDto } from './create-external.dto';

export class UpdateExternalDto extends PartialType(CreateExternalDto) {}
