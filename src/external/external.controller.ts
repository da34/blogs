import { Controller, Get } from '@nestjs/common';
import { ExternalService } from './external.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('外部服务')
@Controller('external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) {}

  @Get('verse')
  getVerse() {
    return this.externalService.fetchHitokoto();
  }

  @Get('hw_token')
  getHWToken() {
    return this.externalService.fetchHWToken();
  }
}
