import http from '@/utils/http/request';

/**
 * @description: 获取邮件列表
 */
export function getEmails(params) {
  return http.request({
    url: 'smtp',
    method: 'get',
    params
  });
}

/**
 * @description: 删除邮件
 */
export function delEmail(id) {
  return http.request({
    url: 'smtp/' + id,
    method: 'delete'
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 编辑邮件
 */
// export function editLink(data) {
//   return http.request({
//     url: 'links/' + data.id,
//     method: 'patch',
//     data
//   },{
//     isShowSuccessMessage: true
//   });
// }
