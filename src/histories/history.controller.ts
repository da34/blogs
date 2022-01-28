import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../users/entities/user.entity';
import { Auth } from '../common/decorator/auth.decorator';

@ApiTags('建站日志')
@Controller('histories')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Auth([UserRole.Admin])
  @Post()
  create(@Body() createLogDto: CreateHistoryDto) {
    console.log(createLogDto, 'createLogDto');
    return this.historyService.create(createLogDto);
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(id);
  }

  @Auth([UserRole.Admin])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: UpdateHistoryDto) {
    return this.historyService.update(id, updateLogDto);
  }

  @Auth([UserRole.Admin])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(id);
  }
}
