import http from '@/utils/http/request';

/**
 * @description: 获取全部菜单
 */
export function getWorks() {
  return http.request({
    url: 'works',
    method: 'get',
  });
}

/**
 * @description: 创建菜单
 */
export function createWork(data) {
  return http.request({
    url: 'works',
    method: 'post',
    data
  }, {
    isShowSuccessMessage: true
  });
}

/**
 * @description: 修改菜单
 */
export function updateWork(data) {
  return http.request({
    url: 'works/' + data.id,
    method: 'patch',
    data
  }, {
    isShowSuccessMessage: true
  });
}

/**
 * @description: 删除菜单
 */
export function delWork(id) {
  return http.request({
    url: 'works/' + id,
    method: 'delete'
  }, {
    isShowSuccessMessage: true
  });
}
