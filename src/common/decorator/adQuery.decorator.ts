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
  (data: adDataEnum, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      let query = request.query[data];
      if (data === adDataEnum.Fields && query) {
        query = query.split(',');
      } else {
        query = [];
      }
      return query;
    }
    const { sortBy, filters, fields } = request.query;
    return { sortBy, filters, fields };
  },
);
