import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { enPassword } from '../../utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<{ token: string }> {
    const user = await this.authService.validateUser(username);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    const secretKey = this.configService.get('USER_SECRET_KEY');
    // console.log(enPassword(123456, secretKey));
    if (user.password !== enPassword(password, secretKey)) {
      throw new BadRequestException('密码错误');
    }
    return await this.authService.signToken(user);
  }
}
