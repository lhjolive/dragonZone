import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: _import('login/index'), hidden: true},
  {path: '/404', component: _import('404'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{
      path: 'dashboard', component: _import('dashboard/index')
    }]
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/dataPreprocessing',
    component: Layout,
    redirect: '/dataPreprocessing/dataImport',
    name: '数据预处理模块',
    meta: {title: '数据预处理模块', icon: 'tree'},
    children: [
      {
        path: 'dataImport',
        name: '数据导入',
        component: _import('dataImport/import'),
        meta: {title: '数据导入', icon: 'example'},
        menu: 'dataImport'
      },
      {
        path: 'levelExtr',
        name: '层位提取',
        component: _import('dataImport/levelPick'),
        meta: {title: '层位提取', icon: 'example'},
        menu: 'levelExtr'
      },
      {
        path: 'picMix',
        name: '图像融合',
        component: _import('dataImport/picMix'),
        meta: {title: '图像融合', icon: 'example'},
        menu: 'levelExtr'
      },
      {
        path: 'augmentation',
        name: '数据增强',
        component: _import('photo/photo'),
        meta: {title: '数据增强', icon: 'example'},
        menu: 'augmentation'
      },
    ]
  },
  {
    path: '/modelTrain',
    component: Layout,
    redirect: '/modelTrain/dataSetImport',
    name: '模型训练模块',
    meta: {title: '模型训练模块', icon: 'tree'},
    children: [
      {
        path: 'dataSetImport',
        name: '数据集导入',
        component: _import('dataImport/import'),
        meta: {title: '数据集导入', icon: 'example'},
        menu: 'dataSetImport'
      },
      {
        path: 'modelTraining',
        name: '模型训练',
        component: _import('dataImport/modelTrain'),
        meta: {title: '模型训练', icon: 'example'},
        menu: 'modelTraining'
      },
    ]
  },
  {
    path: '/modelTrain',
    component: Layout,
    redirect: '/modelTrain/dataSetImport',
    name: '预测模块',
    meta: {title: '预测模块', icon: 'tree'},
    children: [
      {
        path: 'forecast',
        name: '预测',
        component: _import('dataImport/forcecast'),
        meta: {title: '预测', icon: 'example'},
        menu: 'forecast'
      },
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/article',
    name: '功能模块',
    meta: {title: '功能模块', icon: 'tree'},
    children: [
      {
        path: 'logOut',
        name: '系统退出',
        component: _import('dataImport/dataImport'),
        meta: {title: '系统退出', icon: 'example'},
        menu: 'logOut'
      },
    ]
  },
  // {
  //   path: '/system',
  //   component: Layout,
  //   redirect: '/system/article',
  //   name: '功能模块',
  //   meta: {title: '功能模块', icon: 'tree'},
  //   children: [
  //     {
  //       path: 'article',
  //       name: '文章',
  //       component: _import('article/article'),
  //       meta: {title: '文章', icon: 'example'},
  //       menu: 'article'
  //     },
  //     {
  //       path: 'coursInfo',
  //       name: '课程管理',
  //       component: _import('coursInfo/coursInfo'),
  //       meta: {title: '课程管理', icon: 'example'},
  //       menu: 'coursInfo'
  //     },
  //     {
  //       path: 'photo',
  //       name: '图片管理',
  //       component: _import('photo/photo'),
  //       meta: {title: '图片管理', icon: 'example'},
  //       menu: 'photo'
  //     },
  //   ]
  // },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/',
  //   name: '',
  //   meta: {title: '用户权限', icon: 'table'},
  //   children: [
  //     {
  //       path: '', name: '用户列表', component: _import('user/user'), meta: {title: '用户列表', icon: 'user'}, menu: 'user'
  //     },
  //     {
  //       path: 'role',
  //       name: '权限管理',
  //       component: _import('user/role'),
  //       meta: {title: '权限管理', icon: 'password'},
  //       menu: 'role'
  //     },
  //   ]
  // },
  {path: '*', redirect: '/404', hidden: true}
]
