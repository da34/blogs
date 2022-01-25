import http from '@/utils/http/request';

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
  // console.log(data, 'data')
  return http.request({
    url: 'contents',
    method: 'post',
    data
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 更新文章
 */
export function updateArticle(data) {
  // console.log(data, 'data')
  return http.request({
    url: 'contents/' + data.id,
    method: 'put',
    data
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 根据id获取文章
 */
export function getArticleById(id) {
  return http.request({
    url: 'contents/' + id,
    method: 'get'
  });
}
