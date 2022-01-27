import http from '@/utils/http/request';

/**
 * @description: 获取友联列表
 */
export function getLinks(params) {
  return http.request({
    url: 'links',
    method: 'get',
    params
  });
}

/**
 * @description: 删除友联
 */
export function delLink(id) {
  return http.request({
    url: 'links/' + id,
    method: 'delete'
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 新增友联
 */
export function createLink(data) {
  return http.request({
    url: 'links',
    method: 'post',
    data
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 编辑友联
 */
export function editLink(data) {
  return http.request({
    url: 'links/' + data.id,
    method: 'patch',
    data
  },{
    isShowSuccessMessage: true
  });
}


/**
 * @description: 更改友联状态
 */
export function statusToggle(data) {
  return http.request({
    url: 'link/statusToggle',
    method: 'put',
    data
  },{
    isShowSuccessMessage: true
  });
}
