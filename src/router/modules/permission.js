import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  name:'permission',
  meta: {
    id: 'permissions', // 用来和后端权限做约定的
  },
  children: [
    {
      path: '',
      name:'permission',
      component: () => import('@/views/permission'),
      meta: { title: 'permission', icon: 'lock' },
    },
  ],
}
