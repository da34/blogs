import http from '@/utils/http/request';

/**
 * @description: 获取评论列表
 */
export function getCommentList(params) {
  return http.request({
    url: 'comments',
    method: 'get',
    params
  });
}

/**
 * @description: 删除评论
 */
export function delComment(id) {
  return http.request({
    url: 'comments/' + id,
    method: 'delete',
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 编辑评论
 */
export function editComment(data) {
  return http.request({
    url: 'comments/' + data.id,
    method: 'patch',
    data
  },{
    isShowSuccessMessage: true
  });
}