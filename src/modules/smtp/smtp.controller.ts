import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query
} from "@nestjs/common";
import { SmtpService } from './smtp.service';
import { CreateSmtpDto } from './dto/create-smtp.dto';
import { UpdateSmtpDto } from './dto/update-smtp.dto';

@Controller('smtp')
export class SmtpController {
  constructor(private readonly smtpService: SmtpService) {}

  @Post()
  create(@Body() createSmtpDto: CreateSmtpDto) {
    return this.smtpService.create(createSmtpDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.smtpService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smtpService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmtpDto: UpdateSmtpDto) {
    return this.smtpService.update(id, updateSmtpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smtpService.remove(id);
  }
}
