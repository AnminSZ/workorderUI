<template>	
      <el-main>
        <el-row gutter="10" type="flex" style="font-family:Microsoft YaHei;font-size:13px ">
          <el-col :span="5.5">
              工单编号:
              <el-input v-model.trim="number" 
              placeholder="请输入工单编号" 
              clearable style="width: 230px;margin-left: 6px" size="small">
              </el-input>
          </el-col>
          <el-col :span="7.2" >
            时间:
            <el-date-picker
              v-model="time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期" size="small"
              value-format="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
          </el-col>
          <el-col :span="6.8">
            关键字:
            <el-input v-model="keyword" placeholder="请输入关键字" clearable 
            style="width: 230px;margin-left: 6px" size="small"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">搜索</el-button>
          </el-col>
        </el-row>
      <el-table stripe="true" :data="tableData" size="small"  
        :header-cell-style="{background:'#f0f0f0', color:'#68727c'}">
        <el-table-column prop="number" label="工单编号" width="250">
        </el-table-column>
        <el-table-column label="问题标题" prop="title"  width="400">
          <template slot-scope="scope">
              <router-link style="color:#409EFF;text-decoration:none;"
                           :to=" '/order/detail/' + scope.row.id ">
                {{scope.row.title}}
              </router-link>
          </template>
        </el-table-column>
        <el-table-column  label="提交时间" prop="createtime"  sortable>
          <template slot-scope="scope">{{scope.row.createtime | formatDateTime }}</template>
        </el-table-column>
         <el-table-column prop="status" label="工单状态" column-key="status"  
         :filters="filters"
          :filter-method="filterHandler"  width="200">
           <template slot-scope="scope">{{scope.row.status | statusFilter }}</template>
        </el-table-column>
        <el-table-column  label="操作"  width="120" prop="id">
           <template slot-scope="scope">
              <router-link style="color:#409EFF;text-decoration:none;"
                           :to=" '/order/detail/' + scope.row.id ">
                查看
              </router-link>
              &nbsp|&nbsp
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
          </template>   
        </el-table-column>
      </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total" pager-count="5" :current-page="currentPage" :page-size="pageSize" :page-count="pageCount"
      @current-change="handleCurrentChange">
    </el-pagination>
    </el-main>
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

  .el-table{
    border:1px solid #DCDFE6;
    margin-top: 15px;
  }

  .el-pagination{
    float: right;
    margin-top: 10px;
  }

</style>

<script>

import Aside from './Aside'
  export default {
  	name:'OrderList',
    data() {
      return {
        tableData: [],
        filters:[{text:'工单已分派',value:1},{text:'正在为您处理',value:2},
          {text:'待您评价',value:3},{text:'工单已关闭',value:4}],
        number:'',
        time:[],
        keyword:'',
        total:'',
        pageSize:'',
        currentPage:'',
        pageCount:''
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          "1": '工单已分派',
          "2": '正在为您处理',
          "3": '待您评价',
          "4": '工单已关闭'
        }
        return statusMap[status]
      }
    },
    created(){
      this.initData();
    },
    components:{
    	'aside_menu':Aside
    },
    methods:{
       filterHandler(value, row, column) {
        const property = column['property'];
        return row.status === value;
      },
       handleCurrentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadTickets();
      },
      initData(){
        var _this = this;
        this.$axios.get('/api/order/all').then((response)=>{
          _this.tableData = response.data.list;
          _this.total = response.data.total;
          _this.pageSize = response.data.pageSize;
          _this.pageCount = response.data.pages;
        })
      },
      loadTickets() {
        var _this = this;
        _this.$axios.get("/api/order/all?page=" + 
          this.currentPage ).then(resp => {
            var data = resp.data;
            _this.tableData = data.list;
            _this.total = response.data.total;
          })
        },
      handleQuery(){
        var startTime='';
        var endTime='';
        var _this = this;
        if(this.time.length!=0){
          startTime = this.time[0];
          endTime = this.time[1];
        }      
        this.$axios.get("/api/order/query?userID="+1+
          "&number="+_this.number+
          "&startTime="+startTime+
          "&endTime="+endTime+
          "&keyword="+_this.keyword).then(resp=>{
            var data = resp.data;
            _this.tableData = data.list;
            _this.total = response.data.total;
          })
        },
      handleDelete(row) {
       var _this = this;
       this.$confirm('删除[' + row.title + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            _this.$axios.delete("/api/order/detail/"+row.id).then(resp => {
            if(resp.data.status=='success'){
              this.$notify({
                title:'成功',
                type: 'success',
                message: '删除成功!'
              });
              _this.loadTickets();
            };
            
            })
         }).catch(() => {
            this.$notify.info({
            title:'取消',
            message: '已取消删除'
            });
          });
        }
      }
  }
</script>