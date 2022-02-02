import http from '@/utils/http/request';

// 获取七牛云token
export function getQiNiuToken() {
  return http.request({
    url: 'external/qn-token',
    method: 'get'
  });
}