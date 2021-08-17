import http from '@/utils/http/request';

/**
 * @description: 获取标签关联文章数
 */
export function getTagRelation() {
  return http.request({
    url: 'tag/relation',
    method: 'get',
  });
}
