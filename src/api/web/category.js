import http from '@/utils/http/request';


/**
 * @description: 获取分类列表
 */
export function getCategories(params) {
  return http.request({
    url: 'category',
    method: 'get',
    params
  });
}

/**
 * @description: 删除分类
 */
export function delCategory(id) {
  return http.request({
    url: 'category/' + id,
    method: 'delete'
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 新增分类
 */
export function createCategory(data) {
  return http.request({
    url: 'category',
    method: 'post',
    data
  },{
    isShowSuccessMessage: true
  });
}

/**
 * @description: 编辑分类
 */
export function editCategory(data) {
  return http.request({
    url: 'category/' + data.id,
    method: 'put',
    data
  },{
    isShowSuccessMessage: true
  });
}