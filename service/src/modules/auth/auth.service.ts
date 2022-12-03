import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    // private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // async validateUser(username: string): Promise<User> | null {
  //   const user = await this.usersService.findOne(username);
  //   return user || null;
  // }

  // async signToken(user: User) {
  //   this.usersService.updateLogged(user.id);
  //   const payload = { ...user };
  //   return {
  //     token: this.jwtService.sign(payload),
  //   };
  // }
}
