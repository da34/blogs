import { Controller, Get } from '@nestjs/common';
import { SiteService } from './site.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('站点统计')
@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Get()
  findAll() {
    return this.siteService.findAll();
  }

  @Get('archive')
  getArchive() {
    return this.siteService.getArchive();
  }
}
