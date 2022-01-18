import { Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('鉴权')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
}
