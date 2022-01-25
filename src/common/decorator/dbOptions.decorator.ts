import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { checkNullObj } from '../utils';

export enum adDataEnum {
  Filters = 'filters',
  SortBy = 'sortBy',
  Fields = 'fields',
}

interface ValueObject {
  where?: object;
  select?: string[];
  order?: object;
}
export const DbOptions = createParamDecorator(
  (data: adDataEnum, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;
    const selectCond: ValueObject = {};

    // fields 因为是以分隔的字符串，所以切割成数组
    query[adDataEnum.Fields] = query[adDataEnum.Fields]?.split(',') || [];

    // // 如果传参，返回指定参数的值
    // return data ? query[data] : query;
    const { fields, sortBy, filters } = query;

    if (fields.length) {
      selectCond.select = fields;
    }
    if (!checkNullObj(sortBy)) {
      selectCond.order = sortBy;
    }
    if (!checkNullObj(filters)) {
      selectCond.where = filters;
    }
    return selectCond;
  },
);
