import request from '@/utils/request'

/**
 * 
 * @param {*} params 列表
 * @returns 
 */
export function getRolesApi (params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 
 * @param {*} data 新增人员
 * @returns 
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'post'
  })
}