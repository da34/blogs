import http from '@/utils/http/request';

/**
 * @description: 获取七牛配置
 */
export function getQiNiuConfig() {
  return http.request({
    url: 'system/qiniu',
    method: 'get',
  });
}

/**
 * @description: 保存七牛配置
 */
export function updateQiniu(data) {
  return http.request({
    url: 'system/qiniu/update',
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
    url: 'system/qiniu/token',
    method: 'get'
  });
}
