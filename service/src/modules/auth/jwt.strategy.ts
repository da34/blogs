import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService, // private readonly userService: UsersService,
    private readonly usersService: UsersService, // private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(user: User) {
    const existUser = await this.usersService.findOne(user.username);
    delete existUser.password;
    if (!existUser) {
      throw new UnauthorizedException('token被篡改');
    }
    return existUser;
  }
}
