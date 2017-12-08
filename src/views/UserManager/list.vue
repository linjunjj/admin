<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="10">
          <el-button-group>
            <el-button size="small" type="success"  @click="goGoodsImges()">图表概览</el-button>
          </el-button-group>
        </el-col>

          <el-col :span="14">
            <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item"
                      placeholder="请输入关键字" v-model="condition" size="small">
            </el-input>
            <el-select clearable style="width: 100px" class="filter-item" v-model="value" placeholder="状态"
                       size="small">
              <el-option v-for="item in goodStatus" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter()" size="small">搜索
            </el-button>

          </el-col>
      </el-row>

    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" :height="tableHeight" border stripe fit
              highlight-current-row style="width: 100%">
      <el-table-column
        type="index"
        width="80px"
        label="序号"
      >
      </el-table-column>

      <el-table-column align="center" width="100px" label="用户头像">
        <template scope="scope">
          <img :src="scope.row.headimage" style="width: 64px;height: 64px;padding-top: 5px;"/>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120px" label="OpenID" prop="openid" sortable>
      </el-table-column>

      <el-table-column align="center" min-width="200px" label="昵称" sortable>
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100px" label="ID" prop="id">
      </el-table-column>
      <el-table-column align="center" width="100px" label="性别" prop="sex">
      </el-table-column>

      <el-table-column align="center" width="80px" label="国家" prop="country">
      </el-table-column>

      <el-table-column align="center" width="100px" label="省" prop="province" sortable>
      </el-table-column>

      <el-table-column align="center" width="100px" label="城市" prop="city" sortable>
      </el-table-column>

      <el-table-column align="center" width="100px" label="电话" prop="tel" sortable>
      </el-table-column>

      <el-table-column align="center" width="150px" label="邮箱" prop="email" sortable>
      </el-table-column>
      <el-table-column align="center" width="150px" label="IP" prop="ip" sortable>
      </el-table-column>

      <el-table-column align="center" width="180px" label="创建时间"  sortable>
        <template scope="scope">
          {{scope.row.createtime | parseTime}}
        </template>
      </el-table-column>

      <el-table-column align="center" width="180px" label="最近一次登入时间" sortable>
        <template scope="scope">
          {{scope.row.login | parseTime}}
        </template>

      </el-table-column>

      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status ? '会员' : '非会员'}}</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {parseTime} from '../../assets/js/tool';
  import keepAliveList from '../keepAliveList';




  export default {
    components: {},
    name: 'GoodList',
    data() {
      return {
        tableHeight: 0,
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          title: undefined,
          status: undefined
        },
        goodStatus: [{label: '未认证', value: 0}, {label: '已认证', value: 1}],
          value:'',
        condition:'',
        checkAllTag: true,
        checkedTags: [1, 2],
        isIndeterminateTag: true,
        checkAllStatus: true,
        checkedStatuss: [0, 1],
        isIndeterminateStatus: false,
        showAdvancedSearchPopover: false
      };
    },
    created() {
         this.judge();
      this.tableHeight = document.documentElement.clientHeight - (50 + 20 + 50 + 70);
      $(window).resize(() => {
        this.tableHeight = document.documentElement.clientHeight - (50 + 20 + 50 + 70);
      });
    },


    filters: {
      parseTime(time) {
        return parseTime(time);
      },
      statusFilter(status) {
        const statusMap = ['danger', 'success'];
        return statusMap[status];
      }
    },
    methods: {
      judge() {
        var info = '';
        var temp = '';
        info = this.$store.getters.status;
        temp = this.$store.getters.conditions;
        console.log(info);
        this.value = info;
        this.condition = temp;
        if (info === 0 || info === 1 || info === 2) {
          if (temp == '') {
            this.getStatusList(info);
          } else {
            this.getSearchUserStatus(temp, info);
          }

        } else {
          if (temp == '') {
            this.getList();
          } else {
            this.getSearchUser(temp)
            console.log(temp)
          }
        }
      },
      getList() {
        this.listLoading = true;
        setTimeout((items, total) => {
          var info = {};
          info.page = this.listQuery.page;
          info.pagesize = this.listQuery.limit;
          this.$store.dispatch('GetUserList', info).then((res) => {
            this.total = res.total;
            this.list = res.list;
          })
          this.listLoading = false;
        }, 2000);
      },

      parseTimes(time) {
        return parseTime(time);
      },
      getStatusList(status) {
        this.listLoading = true;
        setTimeout((items, total) => {
          var info = {};
          info.status = status;
          info.page = this.listQuery.page;
          info.pagesize = this.listQuery.limit;
          this.$store.dispatch('GetStatusVillage', info).then((res) => {
            this.total = res.total;
            this.list = res.list;
          })
          this.listLoading = false;
        }, 2000);
      },
      getSearchUser(condition) {

        this.listLoading = true;
        setTimeout((items, total) => {
          var info = {};
          info.condition = condition;
          info.page = this.listQuery.page;
          info.pagesize = this.listQuery.limit;
          this.$store.dispatch('GetSearchMemberApply', info).then((res) => {
            this.total = res.total;
            this.list = res.list;
          })
          this.listLoading = false;
        }, 2000);


      },
      getSearchUserStatus(condition, status) {
        this.listLoading = true;
        setTimeout((items, total) => {
          var info = {};
          info.condition = condition;
          info.status = status;
          info.page = this.listQuery.page;
          info.pagesize = this.listQuery.limit;
          this.$store.dispatch('GetSearchMemberApplyStatus', info).then((res) => {
            console.log(res.list);
            this.total = res.total;
            this.list = res.list;
          })
          this.listLoading = false;
        }, 2000);
      },
      handleFilter() {
        this.$store.dispatch('ChangeCondition', this.value).then(() => {
          this.$store.dispatch('ChangCon', this.condition).then(() => {
            this.judge();
          })
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.judge();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.judge();
      },


      handleCheckedStatusChange(value) {
        let checkedCount = value.length;
        this.checkAllStatus = checkedCount === this.goodStatus.length;
        this.isIndeterminateStatus = checkedCount > 0 && checkedCount < this.goodStatus.length;
      },
      goGoodsImges() {
        this.jump({path: '/user/userImage'});
      },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        if (keepAliveList.indexOf(from.path) !== -1) {
          vm.listQuery.page = 1;
          vm.listQuery.limit = 20;
          vm.listQuery.title = undefined;
          vm.listQuery.status = undefined;
          vm.judge();
        }
      });

  }}
</script>

<style>
  .good-manage-list.menu-popper-class {
    min-width: 60px !important;
  }
</style>
