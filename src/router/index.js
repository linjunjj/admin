import Vue from 'vue';
import Router from 'vue-router';

/* layout */
import Layout from '../views/Layout/Layout';

/* login */
import Login from '../views/Login/index.vue';
// const authRedirect = _import('Login/authredirect');

/* dashboard */
import Bashboard from '../views/Bashboard/index.vue';

/* swiper manager */
import {AddSwiper, SwiperList} from '../views/SwiperManager';

/* client manager */
import {EditClient, ClientList} from '../views/ClientManager';

/* good manager */
import {AddGood, GoodList} from '../views/GoodManager';
import {DealImage,InCome,OutCome} from '../views/DealManger/';

/* category manager */
import CategoryManager from '../views/CategoryManager/index.vue';
//用户列表
import UserList from '../views/UserManager/list.vue';
import UserImage from  '../views/UserManager/index.vue'
import {MemberApply, StoreApply,VillageApply,WithdrawApply} from '../views/InformManager';
/* order manager */
import {OrderList,OrderImage} from '../views/OrderManager';
/* error page */
import Err404 from '../views/Error/404.vue';
import Err401 from '../views/Error/401.vue';

Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true, meta: {keepAlive: false}},
  // {path: '/authredirect', component: authRedirect, hidden: true},
  {path: '/404', component: Err404, hidden: true, meta: {keepAlive: true}},
  {path: '/401', component: Err401, hidden: true, meta: {keepAlive: true}},
  {path: '/', redirect: '/dashboard', hidden: true, meta: {keepAlive: false}}
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
});

export const asyncRouterMap = [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    name: '首页',
    icon: 'fa-home',
    noDropdown: true,
    children: [{path: 'index', component: Bashboard, name: '首页', meta: {keepAlive: false, keepTabsView: true}}]
  },

  {
    path: '/web',
    component: Layout,
    redirect: '/web/swiper-manager',
    name: '官网设置',
    icon: 'fa-cogs',
    children: [
      {path: 'swiper-manager', component: SwiperList, name: '轮播图设置', meta: {keepAlive: true, keepTabsView: true}},
      {path: 'add-swiper', component: AddSwiper, name: '新增轮播图', hidden: true, meta: {keepAlive: false, keepTabsView: false}}
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userList',
    name: '用户管理',
    icon: 'fa-gift',
    children: [
      {path: 'userList', component: UserList, name: '用户列表', meta: {keepAlive: true, keepTabsView: true}},
      {path: 'userImage', component: UserImage, name: '用户概览', meta: {keepAlive: true, keepTabsView: true}},

    ]
  },
  {
    path: '/client',
    component: Layout,
    redirect: '/client-manager',
    name: '店家管理',
    icon: 'fa-users',
    children: [
      {path: 'client-manager', component: ClientList, name: '店家列表', meta: {keepAlive: true, keepTabsView: true}},
      {path: 'edit-client', component: EditClient, name: '编辑店家', hidden: true, meta: {keepAlive: false, keepTabsView: false}}
    ]
  },
  {
    path: '/good',
    component: Layout,
    redirect: '/good/good-manager',
    name: '商品管理',
    icon: 'fa-gift',
    children: [
      {path: 'good-manager', component: GoodList, name: '商品列表', meta: {keepAlive: true, keepTabsView: true}},
      {path: 'add-good', component: AddGood, name: '新增商品', hidden: true, meta: {keepAlive: false, keepTabsView: false}},
      {path: 'category-manager', component: CategoryManager, name: '商品分类设置', meta: {keepAlive: false, keepTabsView: true}}
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/order-manager',
    name: '订单管理',
    icon: 'fa-file-text',
    children: [
      {path: 'order-manager', component: OrderList, name: '订单列表', meta: {keepAlive: true, keepTabsView: true}},
      {path: 'orderImage', component: OrderImage, name: '订单概览', meta: {keepAlive: false, keepTabsView: false}}

    ]
  },
  {
    path: '/deal',
    component: Layout,
    redirect: '/deal/deal',
    name: '交易流水管理',
    icon: 'fa-gift',
    children: [
      {path: 'deal', component: DealImage, name: '交易概览', meta: {keepAlive: true, keepTabsView: true}},
      {path: 'income', component: InCome, name: '收入列表', meta: {keepAlive: true, keepTabsView: true}},
      {path: 'outcome', component: OutCome, name: '支出列表', meta: {keepAlive: true, keepTabsView: true}},

    ]
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/memberApply',
    name: '通知管理',
    icon: 'fa-gift',
    children: [
      {path: 'memberApply', component: MemberApply, name: '会员申请', meta: {keepAlive: false, keepTabsView: false}},
      {path: 'storeApply', component: StoreApply, name: '商城申请', meta: {keepAlive: false, keepTabsView: false}},
      {path: 'villageApply', component: VillageApply, name: '村村通申请', meta: {keepAlive: false, keepTabsView: false}},
      {path: 'withdrawApply', component: WithdrawApply, name: '提现申请', meta: {keepAlive: false, keepTabsView: false}},

    ]
  },
  {path: '*', redirect: '/404', hidden: true}
];
