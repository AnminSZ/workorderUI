<template>
  <el-container>
    <el-header style="line-height: 20px;background-color: white;">
       <el-row style="background-color:#f5f7fa;height: 40px;width: 100%;margin-top: 10px">
          <el-col style="border-left: #409EFF 5px solid;height: 100%;"> 
              <p style="font-size: 14px;margin-left: 15px;margin-top: 10px;margin-bottom: 0px;">热点问题推荐</p>
          </el-col>
        </el-row>
    </el-header>
     <!--  <el-aside>
          <el-menu>
            <el-menu-item index="2">
              <span slot="title">导航二</span>

            </el-menu-item>
            <el-menu-item index="3">
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">  
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
      </el-aside> -->
      <el-main style="padding-top: 5px;">
        <el-tabs tab-position="left" style="height: 600px;border:1px solid #eee">
          <el-tab-pane label="远程连接咨询">
            <div style="font-size: 14px;">
              <p style="border-bottom: 1px solid #eee;padding-bottom: 10px;">
              智能顾问为您推荐解决率最高的 <span style="color: #ff6600">9</span> 条热门知识点，可能有您需要的答案：
              </p>
              <ul style="list-style-type: decimal;">
                <li>【推荐】无法连接 Windows 实例怎么办？</li>
                <li>【推荐】无法连接 Linux 实例怎么办？</li>
                <li>【推荐】远程桌面无法连接的排查方法（Windows）</li>
                <li>【推荐】如何通过管理控制台登录服务器？</li>
                <li>如何登录 Windows 实例？</li>
                <li>Linux 中 SSH 无法远程登录怎么办？</li>
                <li>如何登录 Linux 实例？</li>
                <li>创建快照</li>
                <li>登录Windows实例报错：The function requested is not supported（出现身份验证错误，要求的函数不受支持）</li>
              </ul>
            </div>
            
          </el-tab-pane>
          <el-tab-pane label="网站无法访问/打不开">配置管理</el-tab-pane>
          <el-tab-pane label="服务器带宽,cpu跑满/跑高">角色管理</el-tab-pane>
          <el-tab-pane label="网络访问丢包延时高">定时任务补偿</el-tab-pane>
          <el-tab-pane label="环境配置与软件安装">定时任务补偿</el-tab-pane>
          <el-tab-pane label="续费/续费变配">定时任务补偿</el-tab-pane>
          <el-tab-pane label="密码修改/重置">定时任务补偿</el-tab-pane>
          <el-tab-pane label="数据迁移业务上云咨询">定时任务补偿</el-tab-pane>
          <el-tab-pane label="服务器带宽,cpu跑满/跑高">定时任务补偿</el-tab-pane>
          <el-tab-pane label="磁盘扩容">定时任务补偿</el-tab-pane>
          <el-tab-pane label="配置升级咨询">定时任务补偿</el-tab-pane> 
        </el-tabs>
      </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      activeName:'2'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li{
    margin-bottom: 15px;
  }
</style>