import http from '@/utils/http/request';

/**
 * @description: 获取页面列表
 */
export function getPages() {
  return http.request({
    url: 'page',
    method: 'get',
  });
}

/**
 * @description: 删除页面
 */
export function delPage(id) {
  return http.request({
    url: 'page/' + id,
    method: 'delete'
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 新增页面
 */
export function createPage(data) {
  return http.request({
    url: 'page',
    method: 'post',
    data
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 更新页面
 */
export function updatePage(data) {
  return http.request({
    url: 'page/' + data.id,
    method: 'patch',
    data
  },{
    isShowSuccessMessage: true
  });
}