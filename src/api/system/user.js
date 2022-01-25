import http from '@/utils/http/request';

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
    url: '/users',
    method: 'get',
  });
}

/**
 * @description: 用户登录
 */
export function login(data) {
  return http.request(
    {
      url: '/auth/login',
      method: 'POST',
      data,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 游客登录
 */
export function touLogin() {
  return http.request(
    {
      url: 'touLogin',
      method: 'POST'
    }
  );
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: 'login/logout',
    method: 'POST',
    params,
  });
}
