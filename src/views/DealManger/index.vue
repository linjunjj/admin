<template>
  <div class="dashboard-editor-container" v-loading="listLoading">
    <el-row class="btn-group">
      <el-col :span="4" class='text-center'>
        <span class="pan-btn light-blue-btn">本日支出金额：{{todayoutcome}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn pink-btn">本日收入金额：{{todayincome}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn green-btn">总收入金额:{{sumincome}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn light-blue-btn">总支出金额:{{sumoutcome}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <money-chart :weekincome="weekIncome" :weekoutcome="weekOutcome"></money-chart>
      </el-col>
      <el-col :span="12">
        <order-chart :data="monthcome"></order-chart>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <visitor-chart :monthincome="monthMeneyincome" :monthoutcome="monthMeneyoutcome"></visitor-chart>
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
        todayoutcome:0,
        todayincome:0,
        sumincome:0,
        sumoutcome:0,
        weekIncome:[],
        weekOutcome:[],
        monthday:0,
        monthcome:[],
        monthMeneyincome:[],
        monthMeneyoutcome:[],
      };
    },
    created(){
      this.data();
    },
    methods:{
      GetData(){
        this.listLoading=true;
        setTimeout(()=>{
          this.$store.dispatch('GetDealImage').then((res)=>{
            this.todayoutcome=res.todayoutcome;
            this.todayincome=res.todayincome;
            this.sumincome=res.income;
            this.sumoutcome=res.outcome;
            this.weekIncome=res.weekIncome;
            this.weekOutcome=res.weekOutcome;
            this.monthday=res.moneyDay;
            this.monthcome=res.monthcome;
            this.monthMeneyincome=res.monthMeneyincome;
            this.monthMeneyoutcome=res.monthMeneyoutcome;
          })
          this.listLoading=false;


        },2000)
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
