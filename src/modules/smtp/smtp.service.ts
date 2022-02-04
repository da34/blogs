import { CreateSmtpDto } from './dto/create-smtp.dto';
import { UpdateSmtpDto } from './dto/update-smtp.dto';
import { SMTP } from './entities/smtp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { sendEmail } from './meail.util';
import { HttpException, HttpStatus } from '@nestjs/common';

export class SmtpService {
  constructor(
    @InjectRepository(SMTP)
    private smtpRepository: Repository<SMTP>,
    private configService: ConfigService,
  ) {}
  async create(createSmtpDto: CreateSmtpDto) {
    const { host, port, user, pass } = this.configService.get('smtp');
    const { to, form, text } = createSmtpDto;
    await sendEmail(createSmtpDto, {
      host,
      port,
      user,
      pass,
    }).catch(() => {
      throw new HttpException('邮件发送失败', HttpStatus.BAD_REQUEST);
    });
    const newSMTP = await this.smtpRepository.create(createSmtpDto);
    await this.smtpRepository.save(newSMTP);
    return newSMTP;
  }

  findAll() {
    return `This action returns all smtp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} smtp`;
  }

  update(id: number, updateSmtpDto: UpdateSmtpDto) {
    return `This action updates a #${id} smtp`;
  }

  remove(id: number) {
    return `This action removes a #${id} smtp`;
  }
}
