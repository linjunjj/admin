<template>
  <div align="center" style="width: 50%" v-loading="listLoading">

    <el-tag>当前积分返还比率为{{rate}}</el-tag>

    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="积分比率"
          prop="age"
          :rules="[
      { required: true, message: '积分比率不能为空'},
      { type: 'number', message: '积分比率必须为小数值'}
    ]"
        >
          <el-input type="age" v-model.number="numberValidateForm.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
          <el-button @click="resetForm('numberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>

  </div>
</template>

<script>
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        numberValidateForm: {
          age: ''
        },
        rate:0,
        listLoading:false,
      };

    },
    created(){
      this.getData();
    },
    methods: {

      getData(){
        this.listLoading=true;
        setTimeout(()=>{
          this.$store.dispatch('Get_CreditRate').then((res)=>{
            this.rate=res;
          })
          this.listLoading=false;
        },1000)

      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.listLoading=true;
            setTimeout(()=>{
              var info={};
              info.id=1;
              info.rate=this.numberValidateForm.age;
              this.$store.dispatch('Update_CreditRate',info).then((res)=>{
                this.rate=res;
              })
             this.listLoading=false;
            },1000)

          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
 background-color: #ffffff;
align-content: center;
  }
  .demo-ruleForm{
    margin-top: 80px;
  }
  .bady{
    align-content: center;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }

</style>
