import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MetasService } from './metas.service';
import { CreateMetaDto } from './dto/create-meta.dto';
import { UpdateMetaDto } from './dto/update-meta.dto';

@Controller('metas')
export class MetasController {
  constructor(private readonly metasService: MetasService) {}

  @Post()
  create(@Body() createMetaDto: CreateMetaDto) {
    return this.metasService.create(createMetaDto);
  }

  @Get()
  findAll() {
    return this.metasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetaDto: UpdateMetaDto) {
    return this.metasService.update(+id, updateMetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metasService.remove(+id);
  }
}
