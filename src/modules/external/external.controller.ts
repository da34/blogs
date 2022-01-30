import { Controller, Get } from '@nestjs/common';
import { ExternalService } from './external.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../decorator/auth.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('外部服务')
@Controller('external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) {}

  @Get('verse')
  getVerse() {
    return this.externalService.fetchHitokoto();
  }

  @Auth([UserRole.Admin])
  @Get('qn-token')
  getHWToken() {
    return this.externalService.fetchQNToken();
  }
}
