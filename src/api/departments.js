import request from '@/utils/request'

// 获取组织架构的数据
export function getDeptsAPI () {
  return request({
    url:'/company/department'
  })
}

/**
 * 删除部门
 * @param {*} id 要删除的部门id
 * @returns 
 */
export function delDeptsAPI (id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

/** Delete 增加部门
 * 
*/
export function addDep (data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
/**
 * 
 * @param {*} id 根据id获取部门详情
 * @returns 
 */
export function getDeptByIdApi (id) {
  return request({
    url:'/company/department/' + id
  })
}

/**
 * 
 * @param {*} id 根据id获取部门详情
 * @returns 
 */
export function editDeptByIdApi (data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data
  })
}