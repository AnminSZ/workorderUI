<template>
  <div>

    <el-row style="background-color:#f5f7fa;height: 40px;width: 100%;margin-top: 10px">
        <el-col style="border-left: #409EFF 5px solid;height: 100%;"> 
            <p style="font-size: 14px;margin-left: 15px;margin-top: 10px;margin-bottom: 0px;">提交工单</p>
        </el-col>
    </el-row>
    <el-row style="margin-top: 15px;width: 70%;">
     <el-form :model="orderInfo" :rules="rules" ref="orderInfo" label-width="120px" class="demo-ruleForm">
        <el-form-item label="工单标题：" prop="title">
          <el-input v-model="orderInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="问题描述：" prop="content" >
          <el-input type="textarea" v-model="orderInfo.content" rows="6"></el-input>
        </el-form-item>
        <el-form-item label="优先级：" required>
          <el-radio-group v-model="orderInfo.priority">
            <el-radio  label="1">一般</el-radio>
            <el-radio  label="2">紧急</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号："  prop="phone">
          <el-input v-model.number="orderInfo.phone"></el-input>
          <span style="font-size: 12px;">紧急情况时，华为工程师会与您电话联系， 
            <span style="color: red">请填写正确手机号! </span>
          </span>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="orderInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="上传附件：" prop="type">
           <div style="font-size: 14px;">
              <input id="file" type="file" name="attachmentTemp" @change="getFile($event)" 
                accept=".jpg, .jpeg, .bmp, .png, .gif,.txt, .rar, .zip, .doc, .docx, .conf, .xlsx, .xls, .pdf">
                <br>
                <span style="color: #909399">
                每个附件的大小不得超过8M。附件支持的格式有:'jpg', 'bmp', 'png','gif','txt','rar','zip','doc','docx','conf','pdf', 'xlsx', 'xls'
                </span>
            </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('orderInfo')">立即创建</el-button>
          <el-button @click="resetForm('orderInfo')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
</div>

</template>

<script>
  import Aside from './Aside'
  export default {
    name:'OrderNew',
    data() {
      return {
       orderInfo: {
          title: '',
          content: '',
          status: 1,
          priority: '',
          phone: '',
          email: '',
          attachmentTemp: '',
          createtime: '',
          userID:''
        },
        rules: {
          title: [
            { required: true, message: '请输入工单标题！', trigger: 'blur' },
            { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写工单问题详情信息！', trigger: 'change' }
          ],
          phone: [
            { type: "number", required: true,/* pattern:/^1\d{10}$/,*/  message: '请输入正确的手机号！' }
            // { len:11,  message: '请输入长度为11位的手机号！'}
          ],
          email: [
            { type: 'email', required: true, message: '请输入正确的邮箱！', trigger: 'change' }
          ],
        }
      };
    },
    methods: {
      getFile(event) {
        this.orderInfo.attachmentTemp = event.target.files[0];
        if(this.orderInfo.attachmentTemp.size/1024/1024>8){
          alert("选择的文件大于8M，请重新选择！");
          return;
        }
      },
      submitForm(formName) {
        var _this = this;
        this.orderInfo.createtime = new Date().format("yyyy-MM-dd hh:mm:ss");
        let formData = new FormData();
        formData.append('title', this.orderInfo.title);
        formData.append('content', this.orderInfo.content);
        formData.append('status', this.orderInfo.status);
        formData.append('priority', this.orderInfo.priority);
        formData.append('userid', 1);
        formData.append('phoen', this.orderInfo.phone);
        formData.append('email', this.orderInfo.email);
        formData.append('attachmentTemp', this.orderInfo.attachmentTemp);
        formData.append('createtime', this.orderInfo.createtime);
        let config = {
          headers: {
            'enctype': 'multipart/form-data'
          }
        };
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$axios.post('/api/order/insert/', formData, config).then(function (response) {
              if (response.status === 200) {
                //refresh pages
               //_this.$router.push({name: '/order/list'});
               //window.location.href="http://127.0.0.1:8081/order/list";
              window.location.href="http://49.4.11.10/#/order/list";
               //window.history.back(-1);
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components:{
      'aside_menu':Aside
    }
  }
</script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
