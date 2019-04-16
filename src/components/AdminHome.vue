<template>
  <el-container class="home-container">
    <el-header style="display: flex;align-items: center;justify-content: space-between;box-sizing: content-box;padding: 0px;background-color: #ffffff;">
      <div style="float: left;">
        <img src="../assets/image/logo_huawei.png" style="margin-top:15px;margin-left:15px">
      </div>
      <div style="float:left;align-items: center;margin-top: 20px;margin-right: 15px;cursor: pointer;">
        <el-dropdown>
          <img src="../assets/image/admin_photo.png"
               style="width: 36px;height: 36px;border-radius: 18px;">
          <el-dropdown-menu style="margin-top: -15px;">
            <el-dropdown-item icon="el-icon-setting">更多设置</el-dropdown-item>
            <el-dropdown-item divided>退出管理控制台</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          class="el-menu-vertical-demo" @select="handleClick">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>工单系统</span>
            </template>
            <el-menu-item-group>
              <router-link to="/order/listall" style="text-decoration: none">
                <el-menu-item index="1-1">
                  所有工单
                </el-menu-item>
              </router-link>
              <el-menu-item index="1-2">
                我的工单
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="font-size: 12px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">后台</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.$router.currentRoute.name!=null" v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <router-view></router-view>
      </el-container>
    </el-container>
    <el-footer style="width: 100%;background-color: #282828;height: 40px;text-align: center">
      <div style="margin-top: 8px;">
        <span style="color: white;font-size: 14px;">©2019 华为技术有限公司    粤A2-20044005号</span>
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped>

  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

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
  import AdminOrderList from './AdminOrderList'
  import AdminOrderDetail from './AdminOrderDetail'

  const router = new VueRouter({
    routes: [
      {
        path: '/order/listall',
        name: '所有工单',
        component: AdminOrderList,
      },
      {
        path:'/order/detail/:id',
        name: '工单详情',
        component:AdminOrderDetail,
      }
    ]

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
          this.path = '所有工单'
        else if(index=="1-2")
          this.path = '我的工单'
      }
    }

  }
</script>
