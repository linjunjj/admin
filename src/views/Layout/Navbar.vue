<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <levelbar></levelbar>
    <tabs-view></tabs-view>
    <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
    <div class='screenfull'>
      <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    <el-badge is-dot v-show="isinfo" ></el-badge>
  <b>消息</b>
    <i class="el-icon-caret-bottom"></i>
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">会员申请
            <el-badge :value="memberinfo" :max="99" ></el-badge>
          </el-dropdown-item>
          <el-dropdown-item command="b">村村通申请
            <el-badge :value="villageinfo" :max="99"  ></el-badge>
          </el-dropdown-item>
          <el-dropdown-item command="c">门店申请
            <el-badge :value="storeapplyinfo" :max="99"  ></el-badge>
          </el-dropdown-item>
          <el-dropdown-item command="d">提现申请
            <el-badge :value="withdrawinfo" :max="99"  ></el-badge>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>

        <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Levelbar from './Levelbar';
  import TabsView from './TabsView';
  import Hamburger from '../../components/Hamburger';
  import Screenfull from '../../components/Screenfull';
  import errLogStore from '../../store/errLog';

  export default {
    components: {
      Levelbar,
      TabsView,
      Hamburger,
      Screenfull
    },
    data() {
      return {
        isinfo:false,
        memberinfo:0,
        villageinfo:0,
        storeapplyinfo:0,
        withdrawinfo:0,



        log: errLogStore.state.errLog
      };
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ]),
      add(){
        if (this.memberinfo+this.villageinfo+this.storeapplyinfo+this.withdrawinfo>0){
          this.isinfo=true;
        }else {
        this.isinfo=false;
        }

      }
    },
    created(){
      this.getInfoData();
      this.add();
    },


    methods: {
      getInfoData(){
        this.$store.dispatch('GetInfos',0).then((res)=>{
          this.memberinfo=res.memberinfo;
          this.villageinfo=res.villageinfo;
          this.storeapplyinfo=res.storeapplyinfo;
          this.withdrawinfo=res.withdrawinfo;
        })

      },
      handleCommand(command) {

        var  info=0;
        if (command=='a'){
          if (this.memberinfo>0){
            info=0;
          }else {
           info='';
          }
          this.$store.dispatch('ChangeCondition',info).then(()=>{
            this.jump({path:'/info/memberApply'})
          })

        }else if (command=='b'){
          if (this.villageinfo>0){
            info=0;
          }else {
            info='';
          }
          this.$store.dispatch('ChangeCondition',info).then(()=>{
            this.jump({path:'/info/villageApply'})
          })
        }else if (command=='c'){
          if (this.storeapplyinfo>0){
            info=0;
          }else {
            info='';
          }
          this.$store.dispatch('ChangeCondition',info).then(()=>{
            this.jump({path:'/info/storeApply'})
          })
        }else {
          if (this.withdrawinfo>0){
            info=0;
          }else {
            info='';
          }
          this.$store.dispatch('ChangeCondition',info).then(()=>{
            this.jump({path:'/info/withdrawApply'})
          })
        }
      },


      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar');
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload();// 为了重新实例化vue-router对象 避免bug
        });
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 5px;
      color: red;
    }

    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
</style>
