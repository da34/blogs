import { PartialType } from '@nestjs/swagger';
import { CreateSmtpDto } from './create-smtp.dto';

export class UpdateSmtpDto extends PartialType(CreateSmtpDto) {}
