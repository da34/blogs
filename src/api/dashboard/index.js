import http from '@/utils/http/request';

/**
 * @description: 获取文章、标签、评论、友联数量
 */
export function getDashboardInfo() {
  return http.request({
    url: 'site/info',
    method: 'get',
  });
}



