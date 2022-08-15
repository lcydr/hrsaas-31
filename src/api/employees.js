import request from '@/utils/request'

/**
 * 
 * @returns 获取员工列表 （简单）
 */
export function getEmployeesApi () {
  return request({
    url:'/sys/user/simple'
  })
}

/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeInfoList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployees(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 
 * @param {*} data 批量导入 员工数组
 * @returns 
 */
export function importEmployess (data) {
  return request({
    method: 'post',
    url: '/sys/user/batch', 
    data
  })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data,
  })
}