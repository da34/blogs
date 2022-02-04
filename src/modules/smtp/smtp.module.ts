import { Module } from '@nestjs/common';
import { SmtpService } from './smtp.service';
import { SmtpController } from './smtp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SMTP } from './entities/smtp.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([SMTP]), ConfigModule],
  controllers: [SmtpController],
  providers: [SmtpService],
})
export class SmtpModule {}
