<template>
  <div class="dashboard-editor-container"   v-loading="listLoading"
  >
      <el-col :span="4" class='text-center'>
        <span class="pan-btn light-blue-btn">今日新增用户：{{todaysuer}}</span>
      </el-col>
      <el-col :span="4" class='text-center'>
        <span class="pan-btn green-btn">总用户：{{sumuser}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <money-chart :data="weekadduser"></money-chart>
      </el-col>
    </el-row>

    <el-row :gutter="20" >
      <el-col :span="24" >
        <visitor-chart :data="monthadduser" :month="monthday"></visitor-chart>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import moneyChart from './WeekChart.vue';
  import visitorChart from './UserAddChart.vue';
  export default {
    name: 'Dashboard',
    components: { moneyChart, visitorChart },
    data() {
      return {
        data:[],
        todaysuer:0,
        sumuser:0,
        weekadduser:[],
        monthadduser:[],
        monthday:[],
        listLoading:false,
      };
    },
     created(){
       this.getData();
     },
    mounted:{

    },
     methods:{
       getData(){
         this.listLoading=true;
         setTimeout((items,total)=>{
         this.$store.dispatch('GetUserImage').then((res)=>{
           this.todaysuer=res.newuser;
           this.sumuser=res.alluser;
           this.weekadduser=res.weekUser;
           this.monthday=res.monthday;
           console.log(this.monthday);
           this.monthadduser=res.monthUser;
         })
           this.listLoading=false;
         });
       },
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
