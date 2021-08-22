import http from '@/utils/http/request';
/**
 * @description: 获取最近评论
 */
export function getCommentNew() {
  return http.request({
    url: 'comments/new',
    method: 'get',
  });
}

/**
 * @description: 获取评论列表
 */
export function getCommentList() {
  return http.request({
    url: 'comments',
    method: 'get',
  });
}
