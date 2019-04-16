<template>
  <el-main>
    <el-row>
      <el-col :span="24">
        <el-steps :active="workorder.status" finish-status="success" simple>
          <el-step title="等待受理" ></el-step>
          <el-step title="等待处理" ></el-step>
          <el-step title="等待确认" ></el-step>
          <el-step title="等待评价" ></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row class="row-bg" type="flex">
      <el-col :span="24" style="font-size: 14px">
        <div style="margin-top: 20px;margin-left: 3%;">
          <span style="color: #909399">问题标题：</span>
          <span>{{workorder.title}}</span>
        </div>
        <div style="margin-top: 5px;margin-left: 3%;">
          <span style="color: #909399">工单编号：</span>
          <span>{{workorder.number}}</span>
          <span style="color: #909399;margin-left: 8%;">提交时间：</span>
          <span>{{workorder.createtime | formatDateTime}}</span>
          <span style="color: #909399;margin-left: 8%;">工单状态：</span>
          <span style="color: #67C23A;margin-right: 370px">{{workorder.status | statusFilter}}</span>
          <el-button v-if="workorder.status==1" type="text" @click="handleConfirm" style="margin-left: 15px;">受理工单</el-button>
          <el-button v-if="workorder.status==2" type="text" @click="handleConfirm" style="margin-left: 15px;">确认处理</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row style="background-color:#f5f7fa;height: 40px;width: 100%;margin-top: 10px">
      <el-col style="border-left: #409EFF 5px solid;height: 100%;">
        <p style="font-size: 14px;margin-left: 15px;margin-top: 10px;margin-bottom: 0px;">沟通记录</p>
      </el-col>
    </el-row>

    <el-row>
      <div style="background-color: #F2F6FC;margin-top: 10px">
        <el-timeline style="padding-top:10px;">
          <!--采用v-for循环来获取数据-->
          <el-timeline-item :timestamp="workorder.createtime|formatDate" placement="top">
            <el-card>
              <h4>{{workorder.content}}</h4>
              <p>用户  提交于  {{workorder.createtime | formatDateTime}}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item v-for="comment in comments"
                            :timestamp="comment.createtime|formatDate" placement="top" :key="comment.id">
            <el-card>
              <h4 v-html="comment.content"></h4>
              <p>{{comment.role | rolesFilter}}  提交于  {{comment.createtime | formatDateTime}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-row>

    <el-row v-if="workorder.status<4" style="background-color:#f5f7fa;height: 40px;width: 100%;margin-top: 10px">
      <el-col style="border-left: #409EFF 5px solid;height: 100%;">
        <p style="font-size: 14px;margin-left: 15px;margin-top: 10px;margin-bottom: 0px;">处理沟通</p>
      </el-col>
    </el-row>

    <el-row style="border:1px solid #eee;margin-top: 5px;">
      <form>
        <div v-if="workorder.status==2">
          <el-input
            type="textarea"
            rows="6"
            placeholder="请留言"
            v-model="form.content">
          </el-input>
          <div style="font-size: 14px;margin-top: 15px;">
            <span style="color: #909399">附件上传:</span>
            <input id="file" type="file" name="attachmentTemp" @change="getFile($event)"
                   accept=".jpg, .jpeg, .bmp, .png, .gif,.txt, .rar, .zip, .doc, .docx, .conf, .xlsx, .xls, .pdf">
            <p style="color: #909399">
              每个附件的大小不得超过8M。附件支持的格式有:'jpg', 'bmp', 'png','gif','txt','rar','zip','doc','docx','conf','pdf', 'xlsx', 'xls'
            </p>
          </div>
          <br>
          <el-button  type="primary" size="small" @click="submitForm($event)">
            提交<i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </form>
    </el-row>
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

  .row-bg {
    background-color: #F2F6FC;
    margin-top: 10px;
    border-radius: 4px;
    min-height: 90px;  }

</style>

<script>

  import Aside from './Aside'

  export default {
    name:'OrderDetail',
    data() {
      return {
        workorder:{
          id:this.$route.params.id,
          number:'',
          title:'',
          content:'',
          createtime:'',
          status:''
        },
        comments:[],
        form:{
          content:'',
          attachmentTemp:''
        },
        rate:'',
        radio:''
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
      rolesFilter(roles){
        const rolesMap = {
          "1": '用户',
          "2": '维护工程师'
        }
        return rolesMap[roles]
      }
    },
    created(){
      this.initData();
    },
    components:{
      'aside_menu':Aside
    },
    methods:{
      getFile(event) {
        this.form.attachmentTemp = event.target.files[0];
        if(this.form.attachmentTemp.size/1024/1024>8){
          alert("选择的文件大于8M，请重新选择！");
          return;
        }
      },
      submitForm(event) {
        event.preventDefault();
        var orderid = parseInt(this.$route.params.id );
        var _this = this;
        var createtime = new Date().format("yyyy-MM-dd hh:mm:ss");
        let formData = new FormData();
        formData.append('content', this.form.content);
        formData.append('attachmentTemp', this.form.attachmentTemp);
        formData.append('orderid', orderid);
        formData.append('createtime', createtime);
        formData.append('role', 2);
        let config = {
          headers: {
            'enctype': 'multipart/form-data'
          }
        };
        this.$axios.post('/api/comments/insert/', formData, config).then(function (response) {
          if (response.status === 200) {
            //refresh pages
            _this.loadComments();
          }
        });
        this.emptyForm();
      },

      emptyForm(){
        //清空input中的值
        var obj=document.getElementById('file');
        obj.outerHTML=obj.outerHTML;
        this.form.content = "";
      },

      initData(){
        var _this = this;
        this.$axios.get('/api/order/detail/'+this.workorder.id).then((response)=>{
          _this.workorder.title = response.data.title;
          _this.workorder.number = response.data.number;
          _this.workorder.status = response.data.status;
          _this.workorder.createtime = response.data.createtime;
          _this.workorder.content = response.data.content;
        });
        this.loadComments();
      },

      loadComments(){
        var _this = this;
        this.$axios.get('/api/comments/'+this.workorder.id).then((response)=>{
          _this.comments = response.data;
        });
      },

      handleConfirm(){
        var _this = this;
        this.$confirm('该工单即将进入下一阶段，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          _this.workorder.status += 1;
          let formData = new FormData();
          formData.append('id', _this.workorder.id);
          formData.append('status', _this.workorder.status);
          this.$axios.put("/api/order/status",formData)
            .then((response)=>{
              if(response.data.status=='success'){
                this.$notify({
                  title: '成功',
                  message: '操作已确认！',
                  type: 'success'
                });
              }
            })
        })
      }
    }
  }
</script>
