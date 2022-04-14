import http from '@/utils/http/request';

/**
 * @description: 获取内容列表
 */
export function getContents(params) {
  return http.request({
    url: 'contents',
    method: 'get',
    params
  });
}

/**
 * @description: 创建内容
 */
export function createContent(data) {
  return http.request({
    url: 'contents',
    method: 'post',
    data
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 更新内容
 */
export function updateContent(data) {
  return http.request({
    url: 'contents/' + data.id,
    method: 'patch',
    data
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 根据id获取内容
 */
export function getContentById(id) {
  return http.request({
    url: 'contents/' + id,
    method: 'get'
  });
}

/**
 * @description: 删除文章
 */
export function delContent(id) {
  return http.request({
    url: 'contents/' + id,
    method: 'delete'
  },{
    isShowSuccessMessage: true
  });
}
