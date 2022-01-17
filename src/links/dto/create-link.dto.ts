import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty({ description: '头像' })
  readonly avatar: string;

  @ApiProperty({ description: '简介' })
  readonly outline: string;

  @IsNotEmpty({ message: '网站地址不能为空' })
  @ApiProperty({ description: '网站地址' })
  readonly URL: string;

  @IsNotEmpty({ message: '网站名称不能为空' })
  @ApiProperty({ description: '网站名称' })
  readonly name: string;
}
