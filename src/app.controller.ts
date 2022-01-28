import { Controller, Get, Ip } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('ip')
  ip(@Ip() ip) {
    return ip;
  }
}
