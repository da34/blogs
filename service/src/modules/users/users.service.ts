import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { enPassword } from '../../utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}
  findOne(username: string): Promise<User> {
    return getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async updateLogged(id: number) {
    await getRepository(User).update(id, { loggedTime: Date.now() });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, confirmPwd } = createUserDto;
    if (password !== confirmPwd) {
      throw new HttpException('两次密码不一致', HttpStatus.BAD_REQUEST);
    }
    const secretKey = this.configService.get('USER_SECRET_KEY');
    createUserDto.password = enPassword(password, secretKey);
    const newUser = await this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
}
