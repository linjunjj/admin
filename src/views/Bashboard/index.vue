<template>
  <div class="dashboard-editor-container" v-loading="listLoading">
    <el-row class="btn-group">
      <el-col :span="4" class='text-center'>
        <span class="pan-btn light-blue-btn">总订单：{{sumOrder}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn pink-btn">总店铺：{{sumStore}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn green-btn">总注册数：{{sumUser}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn green-btn">总会员数：{{sumMember}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <money-chart :monthmoney="monthMoney" :month="monthday"></money-chart>
      </el-col>

      <el-col :span="10">
        <order-chart :monthorder="monthOrder" ></order-chart>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <visitor-chart :monthpay="monthpay" :month="monthday" :monthvistor="monthvistor"></visitor-chart>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import moneyChart from './moneyChart.vue';
  import orderChart from './orderChart.vue';
  import visitorChart from './visitorChart.vue';
  export default {
    name: 'Dashboard',
    components: { moneyChart, visitorChart, orderChart },
    data() {
      return {
        listLoading:false,
        sumOrder:'0',
        sumStore:'0',
        sumUser:'0',
        sumMember:'0',
        monthMoney:[],
        monthOrder:[],
        monthvistor:[],
        monthpay:[],
        monthday:[],
      };
    },


    created(){
      this.getData();
    },
    methods:{
      getData(){
        this.listLoading=true;
        setTimeout(()=>{
          this.$store.dispatch('GetHeadImageData').then((res)=>{
              this.sumOrder=res.sumOrder;
              this.sumStore=res.sumStore;
              this.sumUser=res.sumUser;
              this.sumMember=res.sumMember;
              this.monthMoney=res.monthMoney;
              this.monthOrder=res.monthOrder;
              this.monthvistor=res.monthvistor;
              this.monthpay=res.monthpay;
              this.monthday=res.month;
              console.log(this.monthday)
          }).catch(()=>{
          })
          this.listLoading=false;
        })

      }


    },



    computed: {
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    margin: 30px;
    .btn-group {
      margin-bottom: 60px;
    }
    .box-card-header {
      position: relative;
      height: 160px;
    }
    .panThumb {
      z-index: 100;
      height: 150px;
      width: 150px;
      position: absolute;
      left: 0px;
      right: 0px;
      margin: auto;
    }
    .display_name{
      font-size: 30px;
      display: block;
    }
    .info-item{
      display: inline-block;
      margin-top: 10px;
      font-size: 14px;
      &:last-of-type{
        margin-left: 15px;
      }
    }
  }
</style>
