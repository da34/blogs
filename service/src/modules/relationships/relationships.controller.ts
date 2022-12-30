import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';

@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Post()
  create(@Body() createRelationshipDto: CreateRelationshipDto) {
    return this.relationshipsService.create(createRelationshipDto);
  }

  @Get()
  findAll() {
    return this.relationshipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relationshipsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelationshipDto: UpdateRelationshipDto) {
    return this.relationshipsService.update(+id, updateRelationshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relationshipsService.remove(+id);
  }
}
