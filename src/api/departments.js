import request from '@/utils/request'

// 获取组织架构的数据
export function getDeptsAPI () {
  return request({
    url:'/company/department'
  })
}