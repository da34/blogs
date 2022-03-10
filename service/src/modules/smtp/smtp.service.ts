import { CreateSmtpDto } from './dto/create-smtp.dto';
import { UpdateSmtpDto } from './dto/update-smtp.dto';
import { SMTP } from './entities/smtp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException } from '@nestjs/common';

export class SmtpService {
  constructor(
    @InjectRepository(SMTP)
    private smtpRepository: Repository<SMTP>,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}
  async create(createSmtpDto: Partial<CreateSmtpDto>) {
    createSmtpDto.isSuccess = true;
    await this.mailerService.sendMail(createSmtpDto).catch((err) => {
      // console.log(err);
      createSmtpDto.isSuccess = false;
    });

    const newSMTP = await this.smtpRepository.create(createSmtpDto);
    await this.smtpRepository.save(newSMTP);
    return newSMTP;
  }

  async findAll(query) {
    const { page = 1, pageSize = 10, isSuccess, ...otherQuery } = query;
    const smtpQuery = await this.smtpRepository
      .createQueryBuilder('smtp')
      .orderBy('smtp.createTime', 'DESC')
      .take(pageSize)
      .skip((page - 1) * pageSize);

    if (isSuccess) {
      smtpQuery.andWhere('smtp.isSuccess=:isSuccess', { isSuccess });
    }

    if (otherQuery) {
      Object.keys(otherQuery).forEach((q) =>
        smtpQuery.andWhere(`smtp.${q} LIKE :${q}`, {
          [`${q}`]: `%${otherQuery[q]}%`,
        }),
      );
    }
    const count = await smtpQuery.getCount();
    return {
      count,
      list: await smtpQuery.getMany(),
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} smtp`;
  }

  update(id: string, updateSmtpDto: UpdateSmtpDto) {
    return `This action updates a #${id} smtp`;
  }

  async remove(id: string) {
    const exitsContent = await this.smtpRepository.findOne(id);
    if (!exitsContent) {
      throw new HttpException(`不存在id为${id}的邮件`, 401);
    }
    return this.smtpRepository.delete(id);
  }
}
