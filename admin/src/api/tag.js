import http from '@/utils/http/request';

/**
 * @description: 获取标签关联文章数
 */
export function getTagRelation() {
  return http.request({
    url: 'tags/relation',
    method: 'get',
  });
}

/**
 * @description: 获取标签列表
 */
export function getTagList(params) {
  return http.request({
    url: 'tags',
    method: 'get',
    params
  });
}

/**
 * @description: 删除标签
 */
export function delTag(id) {
  return http.request({
    url: 'tags/' + id,
    method: 'delete'
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 新增标签
 */
export function createTag(data) {
  return http.request({
    url: 'tags',
    method: 'post',
    data
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 编辑标签
 */
export function editTag(data) {
  return http.request({
    url: 'tags/' + data.id,
    method: 'patch',
    data
  },{
    isShowSuccessMessage: true
  });
}