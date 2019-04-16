<template>
  <el-main>
    <el-row gutter="10" type="flex" style="font-family:Microsoft YaHei;font-size:13px ">
      <el-col :span="5.5">
        工单编号:<el-input v-model="number" placeholder="请输入工单编号" clearable style="width: 230px;margin-left: 6px" size="small"></el-input>
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
    <el-table stripe="true" :data="tableData" size="small" :header-cell-style="{background:'#f0f0f0', color:'#68727c'}">
      <el-table-column prop="number" label="工单编号" width="250"></el-table-column>
      <el-table-column prop="title" label="问题标题" width="400">
        <template slot-scope="scope">
          <router-link style="color:#409EFF;text-decoration:none;" :to="'/order/detail/' + scope.row.id">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="提交时间" sortable>
        <template slot-scope="scope">{{scope.row.createtime | formatDateTime}}</template>
      </el-table-column>
      <el-table-column prop="status" label="工单状态" column-key="status" :filters="filters" :filter-method="filterHandler" width="200">
        <template slot-scope="scope">{{scope.row.status | statusFilter}}</template>
      </el-table-column>
      <el-table-column prop="priority" label="优先级" column-key="priority" :filters="priorityFilters" :filter-method="filterHandler" width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.priority === 2 ? 'danger' : 'success'"
            disable-transitions>{{scope.row.priority | priorityFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" width="120">
        <template slot-scope="scope">
          <router-link style="color:#409EFF;text-decoration:none;" :to="'/order/detail/' + scope.row.id">查看</router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" page-count="5" :current-page="currentPage" :page-size="pageSize" :page-count="pageCount" @current-change="handleCurrentChange"></el-pagination>
  </el-main>
</template>

<style scoped>
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
  export default {
    name:'AdminOrderList',
    data: function () {
      return {
        tableData:[],
        filters:[{text:'未受理',value:1},{text:'处理中',value:2},
          {text:'等待评价',value:3},{text:'工单已关闭',value:4}],
        priorityFilters:[{text:'一般',value:1},{text:'紧急',value:2}],
        number:'',
        time:'[]',
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
          "1": '未受理',
          "2": '处理中',
          "3": '等待评价',
          "4": '工单已关闭'
        }
        return statusMap[status]
      },
      priorityFilter(priority) {
        const priorityMap = {
          "1": '一般',
          "2": '紧急'
        }
        return priorityMap[priority]
      }
    },
    created(){
      this.initData();
    },
    methods:{
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleCurrentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadTickets();
      },
      initData() {
        var _this = this;
        this.$axios.get('/api/order/all').then(response => {
          _this.tableData = response.data.list;
          _this.total = response.data.total;
          _this.pageSize = response.data.pageSize;
          _this.pageCount = response.data.pages;
        })
      },
      loadTickets() {
        var _this = this;
        this.$axios.get('/api/order/all?page=' + this.currentPage).then(response => {
          _this.tableData = response.data.list;
          _this.total = response.data.total;
        })
      },
      handleQuery() {
        var _this = this;
        var startTime = '';
        var endTime = '';
        if (this.time != null){
          startTime = this.time[0];
          endTime = this.time[1];
        }
        this.$axios.get("/api/order/query?" +
          "number=" + this.number +
          "&startTime=" + startTime +
          "&endTime=" + endTime +
          "&keyword=" + this.keyword).then(response => {
          _this.tableData = response.data.list;
          _this.total = response.data.total;
        })
      }
    }
  }
</script>
