import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkDto {
  @ApiProperty({ description: '头像' })
  readonly avatar: string;
  @ApiProperty({ description: '简介' })
  readonly outline: string;
  @ApiProperty({ description: '网站地址' })
  readonly URL: string;
  @ApiProperty({ description: '网站名称' })
  readonly name: string;
}
