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
    url: 'contents/new',
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

/**
 * @description: 更改文章各个状态
 */
export function changeArticleState(data) {
  return http.request({
    url: 'content/stateToggle',
    method: 'put',
    data
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 创建文章
 */
export function createArticle(data) {
  return http.request({
    url: 'contents',
    method: 'post',
    data
  },{
    isShowSuccessMessage: true
  });
}
