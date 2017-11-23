<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="14">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item"
                    placeholder="请输入关键字" v-model="listQuery.title" size="small">
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
      <el-table-column align="center" width="120px" label="店铺" prop="storename" sortable>
      </el-table-column>
      <el-table-column align="center" width="150px" label="申请人" prop="username">
      </el-table-column>
      <el-table-column align="center" width="140px" label="申请id" prop="userid">
      </el-table-column>
      <el-table-column align="center"  label="银行账户" prop="bankacount">
      </el-table-column>
      <el-table-column align="center" width="80px" label="金额" prop="price">
      </el-table-column>
      <el-table-column align="center" width="150px" label="申请时间" prop="appletime" sortable>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.stutas | statusFilterTip }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="" width="40" fixed="right">
        <template scope="scope">
          <el-popover
            ref="optionMenu"
            placement="bottom-end"
            width="40px"
            popper-class="good-manage-list menu-popper-class"
            trigger="hover"
            :visible-arrow="false">
            <el-row style="margin-bottom: 3px;">
              <el-button v-if="scope.row.status === 0" size="small" type="info"
                         @click="handleModifyStatus(scope.row, 1)">通过
              </el-button>
            </el-row>
            <el-row style="margin-bottom: 3px;">
              <el-button v-if="scope.row.status === 1" size="small" type="warning"
                         @click="handleModifyStatus(scope.row, 0)">未通过
              </el-button>
            </el-row>
            <el-row style="margin-bottom: 3px;">
              <el-button size="small" type="danger" @click="handleDelete(scope.row )">删除
              </el-button>
            </el-row>
          </el-popover>
          <span v-popover:optionMenu>...</span>
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
        goodStatus: [{label: '待审核', value: 0}, {label: '审核通过', value: 1},{label: '审核未通过', value: 2}],
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
      this.tableHeight = document.documentElement.clientHeight - (50 + 20 + 50 + 70);
      $(window).resize(() => {
        this.tableHeight = document.documentElement.clientHeight - (50 + 20 + 50 + 70);
      });
      this.judge();
    },
    filters: {
      parseTime(time) {
        return parseTime(time);
      },
      statusFilter(status) {
        const statusMap = ['primary', 'success', 'warning', 'danger', 'gray'];
        return statusMap[status];
      },
      statusFilterTip(status) {
        const statusMap = ['待审核', '审核通过', '审核未通过'];
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
          this.$store.dispatch('GetWithDrawList',info).then((res)=>{
            this.total=res.total;
            this.list=res.list;
            console.log(res.list);
          })
          this.listLoading = false;
        }, 2000);
      },

      handleModifyStatus(row, status) {
        this.listLoading=true;
        var  info={};
        info.id=row.id;
        info.isauth=status;
        setTimeout(()=>{
          this.$store.dispatch('UpdateWithDrawApply',info).then((res)=>{
            this.judge();
            this.listLoading=false;
            this.$message({
                type:'success',
                message:'成功',
              }
            )

          }).catch((error)=>[
            this.listLoading=false,
            this.$message.error("失败"),
          ])
        },2000)
      },

      handleDelete(info){
        this.$confirm('此操作将永远删除此会员申请，是否继续？','温馨提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.listLoading=true;
          setTimeout(()=>{
            this.$store.dispatch('DeleteWithDrawApply',info).then((res)=>{
              this.getList();
              this.$message({
                type:'success',
                message:'删除成功'
              })
            }).catch((error)=>{
              this.$message.error("删除失败");
            })
            this.listLoading=false;
          },2000);

        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消删除'
          });
        });
      },
      getStatusList(status) {
        this.listLoading = true;
        setTimeout((items, total) => {
          var info={};
          info.status=status;
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetStatusWithDraw',info).then((res)=>{
            this.total=res.total;
            this.list=res.list;
          })
          this.listLoading = false;
        }, 2000);
      },

      handleFilter() {
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
