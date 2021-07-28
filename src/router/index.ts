import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

export type RouteConfig = RouteRecordRaw & {
  hidden?: boolean
  children?: Array<RouteConfig>
}

export const constantRoutes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'index',
      component: () => import('@/views/home/index.vue'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'form',
        component: () => import('@/views/form/index.vue'),
        meta: { title: '表单', icon: 'el-icon-edit-outline' }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    meta: { title: '表格', icon: 'el-icon-edit-outline' },
    children: [
      {
        path: 'index',
        name: 'list',
        component: () => import('@/views/table/List.vue'),
        meta: { title: '列表' }
      },
      {
        path: 'index2',
        name: 'list2',
        component: () => import('@/views/table/List2.vue'),
        meta: { title: '列表2' }
      },
      {
        path: 'detail',
        name: 'detail',
        hidden: true,
        component: () => import('@/views/table/Detail.vue'),
        meta: { title: '详情' }
      }
    ]
  },
  /* {
    path: '/login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  }, */
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/404.vue')
  },
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});

export default router;
