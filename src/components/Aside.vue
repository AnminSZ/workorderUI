<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu
        class="el-menu-vertical-demo" >
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
</template>

<script>  
export default {
  name: 'Aside'
}
</script>

<style>
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

  .el-table{
    border:1px solid #DCDFE6;
    margin-top: 15px;
  }

  .el-pagination{
    float: right;
    margin-top: 10px;
  }

  .row-bg {
    background-color: #F2F6FC;
    margin-top: 10px;
    border-radius: 4px;
    min-height: 90px;  }
</style>