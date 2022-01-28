import http from '@/utils/http/request';

/**
 * @description: 获取全部日志
 */
export function getHistories() {
  return http.request({
    url: 'histories',
    method: 'get',
  });
}

/**
 * @description: 创建日志
 */
export function createHistory(data) {
  return http.request({
    url: 'histories',
    method: 'post',
    data
  }, {
    isShowSuccessMessage: true
  });
}

/**
 * @description: 修改日志
 */
export function updateHistory(data) {
  return http.request({
    url: 'histories/' + data.id,
    method: 'patch',
    data
  }, {
    isShowSuccessMessage: true
  });
}

/**
 * @description: 删除日志
 */
export function delHistory(id) {
  return http.request({
    url: 'histories/' + id,
    method: 'delete'
  }, {
    isShowSuccessMessage: true
  });
}
