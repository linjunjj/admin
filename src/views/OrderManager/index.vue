<template>
  <div class="dashboard-editor-container"  v-loading="listLoading">
    <el-row class="btn-group">
      <el-col :span="4" class='text-center'>
        <span class="pan-btn light-blue-btn">今日订单：{{todayorder}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn pink-btn">今日成交：{{todaypay}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn light-blue-btn">本日成交金额：{{todaymoney}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn pink-btn">总成交订单量：{{sumorders}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn light-blue-btn">总成交金额:{{summoney}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <money-chart :data="weekmoney"></money-chart>
      </el-col>
      <el-col :span="10">
        <order-chart :data="orderplan"></order-chart>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <visitor-chart :data="monthmoney" :month="monthday" ></visitor-chart>
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
        todayorder:0,
        todaypay:0,
        todaymoney:0,
        sumorders:0,
        summoney:0,
       weekmoney:[],
       weekplan:[],
        monthday:[],
        monthmoney:[],
        orderplan:['45','645','342','42','49'],
        listLoading:false,
      };
    },
    created(){
      this.GetData();
    },
    methods:{
      GetData(){
        this.listLoading=true;
        setTimeout(()=>{
          this.$store.dispatch('GetOrderImage').then((res)=>{
            this.todayorder=res.noworder;
            this.todaypay=res.nowOrderPay;
            this.todaymoney=res.todayMoney;
            this.sumorders=res.orderSum;
            this.summoney=res.moneySum;
            this.weekmoney=res.weekMoney;
            this.weekplan=res.weekPlan;
            this.monthday=res.monthDay;
            this.monthMoney=res.monthMoney;
          })
          this.listLoading=false;
        },2000);

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
