import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      hidden: true
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true
    }
  ]
}
