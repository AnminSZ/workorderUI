<template>
  <el-container class="home-container">
    <el-header style="display: flex;align-items: center;justify-content: space-between;box-sizing: content-box;padding: 0px;background-color: #ffffff;">
        
        <div style="float: left;">
          <img src="../assets/image/logo_huawei.png" style="margin-top:15px;margin-left:15px;">
        </div>
        <div>     
          <div style="float: left;;align-items: center;margin-top: 5px;margin-right: 30px;cursor: pointer;">
            <el-dropdown>
              <span>工单</span>
              <el-dropdown-menu style="margin-top: -15px;">
                <el-dropdown-item icon="el-icon-document">我的工单</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit-outline">提交工单</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <!-- <span style="float: left;margin-top: 5px;margin-right: 30px;cursor: pointer;">支持与服务</span>  -->
          <div style="float: left;;align-items: center;margin-top: 5px;margin-right: 30px;cursor: pointer;">
            <el-dropdown>
              <span>支持与服务</span>
              <el-dropdown-menu style="margin-top: -15px;">
                <el-dropdown-item icon="el-icon-document">帮助与文档</el-dropdown-item>
                <el-dropdown-item icon="el-icon-date">支持计划</el-dropdown-item>
                <el-dropdown-item icon="el-icon-phone-outline">专家服务</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit-outline">提交建议</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="float:left;align-items: center;margin-top: 15px;margin-right: 15px;cursor: pointer;">
            <el-dropdown>
              <img src="../assets/image/user_photo.jpg" 
                  style="width: 36px;height: 36px;border-radius: 18px;">
              <el-dropdown-menu style="margin-top: -15px;">
                <el-dropdown-item icon="el-icon-info">基本材料</el-dropdown-item>
                <el-dropdown-item icon="el-icon-edit">实名认证</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">安全设置</el-dropdown-item>
                <el-dropdown-item divided>退出管理控制台</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
    </el-header>
    <el-container style="height:800px; border: 1px solid #eee">
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
        <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-top: 25px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$router.currentRoute.name!=null" v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
        </el-breadcrumb>
        </el-header>
        <router-view></router-view>
      </el-container>
      <!-- </div> -->
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
  import OrderList from './OrderList'
  import OrderDetail from './OrderDetail'
  import OrderNew from'./OrderNew'
  import Index from './Index'

  const router = new VueRouter({
    routes: [
        {
          path: '/order/list',
          name: '我的工单',
          component: OrderList,
        },
        {
          path:'/order/detail/:id',
          component:OrderDetail,
          name:'工单详情'
        },
        {
          path:'/order/new',
          component:OrderNew,
          name:'新建工单'
        },
        {
          path:'/',
          component:Index
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