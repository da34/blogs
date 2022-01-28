import http from '@/utils/http/request';

/**
 * @description: 获取配置
 */
export function getConfig(params) {
  return http.request({
    url: 'system/keyData',
    method: 'get',
    params
  });
}

/**
 * @description: 保存配置
 */
export function updateConfig(data) {
  return http.request({
    url: 'system/keyData/update',
    method: 'post',
    data
  }, {
    isShowSuccessMessage: true
  });
}

/**
 * @description: 获取上传token
 */
export function getQiNiuToken() {
  return http.request({
    url: 'external/qn-token',
    method: 'get'
  });
}
