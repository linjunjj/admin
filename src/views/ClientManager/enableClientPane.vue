<template>
  <div>
    <div class="filter-container">
      <el-row>
        <el-col :span="12">
          <el-button-group>
            <el-button size="small" type="warning" icon="close">禁用</el-button>
            <el-button size="small" type="danger" icon="delete">删除</el-button>
          </el-button-group>
        </el-col>

      </el-row>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" :height="tableHeight" border fit
              highlight-current-row style="width: 100%"
              :default-sort="{prop: 'id', order: 'descending'}">
      <el-table-column align="center"
                       type="selection"
                       width="55">
      </el-table-column>
      <el-table-column align="center" width="100px" label="店铺logo">
        <template scope="scope">
          <img :src="scope.row.storename" style="width: 64px;height: 64px;padding-top: 5px;"/>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="200" label="店铺名称" prop="storename" sortable>
      </el-table-column>

      <el-table-column align="center" width="150" label="店主" prop="storer" sortable>
      </el-table-column>

      <el-table-column align="center" width="150" label="属性" prop="scope" >
      </el-table-column>
      <el-table-column align="center" width="150" label="行业" prop="storetype" >
      </el-table-column>
      <el-table-column align="center" width="150" label="店铺地址" prop="storeaddress" >
      </el-table-column>
      <el-table-column align="center" width="150" label="简介" prop="introduce" >
      </el-table-column>
      <el-table-column align="center" label="状态" width="120" sortable prop="isauth"
                       :filters="[{ text: '启用', value: 1 }, { text: '禁用', value: 0 }]"
                       :filter-method="filterStatus"
                       filter-placement="bottom-end">
        <template scope="scope">
          <el-tag :type="scope.row.isauth | statusFilter">{{scope.row.isauth ? '启用' : '禁用'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120" label="注册时间"  sortable>
        <template scope="scope">
          {{scope.row.timestamp | parseTime}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template scope="scope">
          <el-button v-if="scope.row.isauth === 0" size="small" type="info" @click="handleModifyStatus(scope.row, 1)">启用
          </el-button>
          <el-button v-if="scope.row.isauth === 1" size="small" type="warning"
                     @click="handleModifyStatus(scope.row, 0)">禁用
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
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


  export default {
    name: 'EnableClientPane',
    data() {
      return {
        tableHeight: 0,
        list: null,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          id: undefined,
          name: undefined
        },
        swiperStatus: [{label: '启用', value: 1}, {label: '禁用', value: 0}]
      };
    },
    created() {
      this.getList();
      this.tableHeight = document.documentElement.clientHeight - (50 + 21 + 42 + 15 + 150);
      $(window).resize(() => {
        this.tableHeight = document.documentElement.clientHeight - (50 + 21 + 42 + 15 + 150);
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
          var  info={};
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetStoreStart',info).then((res)=>{
            this.total=res.total;
            this.list=this.list;

          })
          this.listLoading = false;
          this.$emit('updateCount', this.total);
        }, 2000);
      },
      handleModifyStatus(row, status) {
        this.listLoading=true;
        var  info={};
        info.id=row.id;
        info.isauth=status;
        setTimeout(()=>{
          this.$store.dispatch('CantrolStore',info).then((res)=>{
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
      handleDelete(info){
        this.$confirm('此操作将永远删除此店铺，是否继续？','温馨提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.listLoading=true;
          setTimeout(()=>{
            this.$store.dispatch('DeletStore',info).then((res)=>{
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
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleFilter() {
        this.getList();
      },
      handleDetail(client) {
        this.$emit('goToDetial', client.id);
      }
    }
  };
</script>

