import { IsNotEmpty, IsUrl, ValidateIf } from "class-validator";

export class CreateWorkDto {
  @IsUrl()
  @IsNotEmpty()
  imgUrl: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  desc: string;

  priority?: number = 0;

  @ValidateIf((o) => o.linkUrl !== '')
  @IsUrl()
  linkUrl?: string;

  @ValidateIf((o) => o.sourceUrl !== '')
  @IsUrl()
  sourceUrl?: string;
}
