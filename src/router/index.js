import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OrderList from '@/components/OrderList'
import OrderDetail from '@/components/OrderDetail'
import Home from '@/components/Home'
import OrderNew from '@/components/OrderNew'
import AdminHome from '../components/AdminHome'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/order/list',
    //   name: 'OrderList',
    //   component: OrderList
    // },
    // {
    //   path:'/order/detail/:id',
    //   component:OrderDetail
    // },
    // {
    //   path:'/order/new',
    //   component:OrderNew
    // },
    {
      path:'/',
      component:Home
    },
    {
      path:'/admin',
      component:AdminHome
    }
  ],
  mode:"history" , //不用显示#号
  base: '/dist/'
})
