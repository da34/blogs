import request from '../utils/request';

export async function loadArticle({page = 1, pageSize = 10}) {
  return request(`/contents?status=publish&page=${page}&pageSize=${pageSize}`)
  // return res
}