import http from '@/utils/http/request';
/**
 * @description: 获取文章访问量Top5
 */
export function getArticleTop() {
  return http.request({
    url: 'content/articleTop',
    method: 'get',
  });
}
/**
 * @description: 获取最近文章
 */
export function getArticleNew() {
  return http.request({
    url: 'content/articleNew',
    method: 'get',
  });
}

/**
 * @description: 获取文章列表
 */
export function getArticleList(params) {
  return http.request({
    url: 'contents',
    method: 'get',
    params
  });
}
