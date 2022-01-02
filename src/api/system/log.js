import http from '@/utils/http/request';

/**
 * @description: 获取全部日志
 */
export function getLogs() {
  return http.request({
    url: 'logs',
    method: 'get',
  });
}

/**
 * @description: 创建日志
 */
export function createLog(data) {
  return http.request({
    url: 'logs',
    method: 'post',
    data
  }, {
    isShowSuccessMessage: true
  });
}

/**
 * @description: 修改日志
 */
export function updateLog(data) {
  return http.request({
    url: 'logs/' + data.id,
    method: 'put',
    data
  }, {
    isShowSuccessMessage: true
  });
}

/**
 * @description: 删除日志
 */
export function delLog(id) {
  return http.request({
    url: 'logs/' + id,
    method: 'delete'
  }, {
    isShowSuccessMessage: true
  });
}
