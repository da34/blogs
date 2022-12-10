import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { EntityRepository } from '@mikro-orm/sqlite';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly configService: ConfigService,
  ) {}
  async findOne(username: string): Promise<User> {
    console.log('findOne', username);
    console.log('findOne', await this.userRepository.findAll());
    return this.userRepository.findOne({ username });
  }
  async create(createUserDto: CreateUserDto) {
    const { password, confirmPwd, username } = createUserDto;
    const exists = await this.userRepository.count({ username });
    if (exists) {
      throw new HttpException(
        'Username must be unique.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (password !== confirmPwd) {
      throw new HttpException('两次密码不一致', HttpStatus.BAD_REQUEST);
    }
    const secretKey = this.configService.get('USER_SECRET_KEY');
    const user = new User(username, password, secretKey);
    // console.log(user);
    await this.userRepository.persist(user).flush();
    return this.buildUserRO(user);
  }
  private buildUserRO(user: User) {
    return { user };
  }
}
