import { PartialType } from '@nestjs/swagger';
import { CreateRelationshipDto } from './create-relationship.dto';

export class UpdateRelationshipDto extends PartialType(CreateRelationshipDto) {}
