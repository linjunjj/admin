<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button size="small" type="success" icon="plus" @click="handleCreate">新增</el-button>
            <el-button size="small" type="info" icon="arrow-up">发布</el-button>
            <el-button size="small" type="warning" icon="arrow-down">撤下</el-button>
            <el-button size="small" type="danger" icon="delete">删除</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="9" :offset="3">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item" placeholder="名称" v-model="listQuery.title" size="small">
          </el-input>
          <el-select clearable style="width: 100px" class="filter-item" v-model="listQuery.status" placeholder="状态" size="small">
            <el-option v-for="item in swiperStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter" size="small">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" :height="tableHeight" fit highlight-current-row style="width: 100%">
      <el-table-column  align="center"
                        type="selection"
                        width="55">
      </el-table-column>

      <el-table-column  align="center"
                        type="index"
                        width="50">
      </el-table-column>

      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="时间">
              <span>{{props.row.id}}</span>
            </el-form-item>
            <el-form-item label="时间">
              <span>{{props.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ props.row.auditor }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>



      <el-table-column align="center" min-width="200px" label="编号">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="240px" label="轮播图">
        <template scope="scope">
          <img :src="scope.row.imageurl" style="width: 240px;height: 120px;padding-top: 5px;"/>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.isstart | statusFilter">{{scope.row.isstart ? '已发布':'未发布'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button v-if="scope.row.isstart === 0" size="small" type="info" @click="handleModifyStatus(scope.row, 1)">发布
          </el-button>
          <el-button v-if="scope.row.isstart === 1" size="small" type="warning" @click="handleModifyStatus(scope.row, 0)">撤下
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row )">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { parseTime } from '../../assets/js/tool';
  import keepAliveList from '../keepAliveList';

  export default {
    name: 'SwiperList',
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
        swiperStatus: [{ label: '已发布', value: 1 }, { label: '未发布', value: 0 }]
      };
    },
    created() {
      this.getList();
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
      getList() {
        this.listLoading = true;
        setTimeout((items, total) => {
          var info={};
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetBanneList',info).then((res)=>{
            this.total=res.total;
            this.list=res.list;
          })
          this.listLoading = false;
        }, 2000);
      },
      handleFilter() {
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleModifyStatus(row, status) {
        this.listLoading=true;
        var  info={};
        info.id=row.id;
        info.isstart=status;
        setTimeout(()=>{
          this.$store.dispatch('ControlBanner',info).then((res)=>{
            this.getList();
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
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(info){
        this.$confirm('此操作将永远删除此轮播图，是否继续？','温馨提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.listLoading=true;
          setTimeout(()=>{
            this.$store.dispatch('DeleteBanner',info).then((res)=>{
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
      handleCreate() {
        this.jump({path: '/web/add-swiper'});
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
          vm.getList();
        }
      });
    }
  };
</script>
