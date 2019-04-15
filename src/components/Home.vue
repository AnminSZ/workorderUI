<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu 
        class="el-menu-vertical-demo" @select="handleClick">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>工单系统</span>
          </template>
          <el-menu-item-group>

            <router-link to="/order/list" style="text-decoration: none">
              <el-menu-item index="1-1">
               我的工单
              </el-menu-item>
            </router-link>
            
           <router-link to="/order/new" style="text-decoration: none">
              <el-menu-item index="1-2">
               新建工单
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- <div style="width: 100%"> -->
    <el-container>
      <el-header style="font-size: 12px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="path!=''">{{path}}</el-breadcrumb-item>
      </el-breadcrumb>
      </el-header>
      <router-view></router-view>
    </el-container>
    <!-- </div> -->
  </el-container>
</template>

<style scoped>
  
   .el-header {
    background-color: #F7F7F7;
    color: #333;
    line-height: 60px;
  }
  
  .el-breadcrumb{
    padding-top:20px; 
  }
  .el-aside {
    color: #333;
  }
</style>

<script>
  import VueRouter from 'vue-router'
  import OrderList from './OrderList'
  import OrderDetail from './OrderDetail'
  import OrderNew from'./OrderNew'

  const router = new VueRouter({
    routes: [
        {
          path: '/order/list',
          name: 'OrderList',
          component: OrderList,
        },
        {
          path:'/order/detail/:id',
          component:OrderDetail,
        },
        {
          path:'/order/new',
          component:OrderNew
        }
      ],
   
  });
  export default {
  name: 'Home',
  router,
  data(){
    return{
      path:''
    }
  },
  methods:{
    handleClick(index,indexPath){
      if(index=="1-1")
        this.path = '我的工单'
      else if(index=="1-2")
        this.path = '新建工单'
    }
  }

}

</script>