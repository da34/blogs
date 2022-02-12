import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryLinkDto } from './dto/query-link-dto';
import { Link } from './entities/link.entity';
import { UserRole } from '../users/entities/user.entity';
import { DbOptions } from '../../decorator/dbOptions.decorator';
import { Auth } from '../../decorator/auth.decorator';

@ApiTags('友联')
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Auth([UserRole.Admin])
  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Get()
  findAll(@Query() query: QueryLinkDto, @DbOptions() dbOptions) {
    return this.linksService.findAll(query, dbOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Link> {
    return this.linksService.findOne(id);
  }

  @Auth([UserRole.Admin])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linksService.update(id, updateLinkDto);
  }

  @Auth([UserRole.Admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(id);
  }
}
