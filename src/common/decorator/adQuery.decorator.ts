import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export enum adDataEnum {
  Filters = 'filters',
  SortBy = 'sortBy',
  Fields = 'fields',
}
// filters []
// sortBy []
// fields ,
export const AdQuery = createParamDecorator(
  (
    data: adDataEnum,
    ctx: ExecutionContext,
  ): { filters?: []; sortBy?: []; fields?: [] } => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    // fields 因为是以分隔的字符串，所以切割成数组
    query[adDataEnum.Fields] = query[adDataEnum.Fields]?.split(',') || [];

    // 如果传参，返回指定参数的值
    return data ? query[data] : query;
  },
);
