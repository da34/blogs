import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../users/entities/user.entity';
import { Roles } from '../auth/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Auth } from "../common/decorator/auth.decorator";

@ApiTags('配置')
@Auth([UserRole.Admin])
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(createOptionDto);
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.optionsService.findOne(key);
  }

  @Patch(':key')
  update(@Param('key') key: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionsService.update(key, updateOptionDto);
  }
}
