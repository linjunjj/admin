<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="10">

        </el-col>
        <el-col :span="14" >
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item"
                    placeholder="请输入商品名称/编码/规格/关键字" v-model="listQuery.title" size="small">
          </el-input>


          <el-select clearable style="width: 100px" class="filter-item" v-model="value" placeholder="状态"
                     size="small">
            <el-option v-for="item in goodStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索
          </el-button>

        </el-col>
      </el-row>

    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" :height="tableHeight" border stripe fit
              highlight-current-row style="width: 100%">
      <el-table-column align="center"
                       type="selection"
                       width="55">
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="序号"
        type="index"
      ></el-table-column>
      <el-table-column align="center" width="100px" label="商品图片">
        <template scope="scope">
          <img :src="scope.row.goodsimage" style="width: 64px;height: 64px;padding-top: 5px;"/>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120px" label="商品编码" prop="id" sortable>
      </el-table-column>

      <el-table-column align="center" min-width="200px" label="商品名称" sortable>
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.goodsname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100px" label="店铺" prop="storer">
      </el-table-column>
      <el-table-column align="center" width="100px" label="商品类型" prop="typeName">
      </el-table-column>

      <el-table-column align="center" width="100px" label="市场价" prop="marketPrice" sortable>
      </el-table-column>

      <el-table-column align="center" width="100px" label="会员价" prop="memberPrice" sortable>
      </el-table-column>

      <el-table-column align="center" width="100px" label="库存" prop="goodsSum" sortable>
      </el-table-column>

      <el-table-column align="center" width="150px" label="售出数量" prop="soldamount" sortable>
      </el-table-column>
      <el-table-column align="center" width="250px" label="新增时间" prop="createTime" sortable>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.isstart | statusFilter">{{scope.row.isstart ? '已上架' : '待上架'}}</el-tag>
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
        goodStatus: [{label: '上架', value: 1}, {label: '下架', value: 0}],
        value:'',

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
      judge(){
        var  info='';
        info=this.$store.getters.status;
        console.log(info);
        this.value=info;
        if (info===0||info===1||info===2){
          this.getStatusList(info);

          console.log("第一个");

        }else {
//          this.$store.dispatch('ChangeCondition','').then(()=>{
          this.getList();
          //  })
          console.log("第二个");
        }
      },
      getList() {
        this.listLoading = true;
        setTimeout((items, total) => {
          var info={};
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetGoodsList',info).then((res)=>{
            this.total=res.total;
            this.list=res.list;
          })
          this.listLoading = false;
        }, 2000);
      },
      getStatusList(status) {
        this.listLoading = true;
        setTimeout((items, total) => {
          var info={};
          info.status=status;
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetStatusGoods',info).then((res)=>{
            this.total=res.total;
            this.list=res.list;
          })
          this.listLoading = false;
        }, 2000);
      },

      handleFilter() {
        console.log(this.value);
        this.$store.dispatch('ChangeCondition',this.value).then(()=>{
          this.judge();
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

      handleCheckedTagsChange(value) {
        let checkedCount = value.length;
        this.checkAllTag = checkedCount === this.tags.length;
        this.isIndeterminateTag = checkedCount > 0 && checkedCount < this.tags.length;
      },

      handleCheckedStatusChange(value) {
        let checkedCount = value.length;
        this.checkAllStatus = checkedCount === this.goodStatus.length;
        this.isIndeterminateStatus = checkedCount > 0 && checkedCount < this.goodStatus.length;
      },
      handleCreate() {
        this.jump({path: '/good/add-good'});
      }
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
    }
  };
</script>

<style>
  .good-manage-list.menu-popper-class {
    min-width: 60px !important;
  }
</style>
