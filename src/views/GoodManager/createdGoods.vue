<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="10">
          <el-button-group>
            <el-button size="small" type="success" icon="plus" @click="handleCreate">新增</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="14">
          <el-input @keyup.enter.native="handleFilter" style="width: 230px;" class="filter-item"
                    placeholder="请输入商品名称/编码/规格/关键字" v-model="listQuery.title" size="small">
          </el-input>


          <el-select clearable style="width: 100px" class="filter-item" v-model="listQuery.status" placeholder="状态"
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
      >
      </el-table-column>
      <el-table-column align="center" width="100px" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.imageurl" style="width: 64px;height: 64px;padding-top: 5px;"/>
        </template>
      </el-table-column>

      <el-table-column align="center" width="120px" label="编码" prop="id" sortable>
      </el-table-column>

      <el-table-column align="center" min-width="200px" label="积分商品名称" sortable>
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.creditgood}}</span>
        </template>
      </el-table-column>



      <el-table-column align="center" width="100px" label="所需积分" prop="price" sortable>
      </el-table-column>

      <el-table-column align="center" width="100px" label="库存" prop="goodsSum" sortable>
      </el-table-column>

      <el-table-column align="center" width="150px" label="售出数量" prop="soldamount" sortable>
      </el-table-column>
      <el-table-column align="center" width="250px" label="新增时间" prop="createtime" sortable>
      </el-table-column>
      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isstart | statusFilter">{{scope.row.isstart ? '已上架' : '待上架'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="" width="40" fixed="right">
        <template slot-scope="scope">
          <el-popover
            ref="optionMenu"
            placement="bottom-end"
            width="40px"
            popper-class="good-manage-list menu-popper-class"
            trigger="hover"
            :visible-arrow="false">
            <el-row style="margin-bottom: 3px;">
              <el-button v-if="scope.row.isstart === 0" size="small" type="info"
                         @click="handleModifyStatus(scope.row, 1)">上架
              </el-button>
            </el-row>
            <el-row style="margin-bottom: 3px;">
              <el-button v-if="scope.row.isstart === 1" size="small" type="warning"
                         @click="handleModifyStatus(scope.row, 0)">下架
              </el-button>
            </el-row>
            <el-row style="margin-bottom: 3px;">
              <el-button size="small" type="info" @click="editGoods(scope.$index)">编辑
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

    <el-dialog title="商品" :visible.sync="dialogTableVisible" fullscreen="ture">
      <el-table :data="gridData">
        <el-table-column align="center" min-width="200px" label="积分商品名称" >
          <template slot-scope="scope">
            <el-input v-show="isshow" size="mini" v-model="scope.row.goodsName" style="width:100px"></el-input>
            <span v-show="!isshow">{{ scope.row.goodsName }}</span>
            <el-button :type="isshow?'success':'primary'" @click='isshow=!isshow' size="mini" icon="edit">{{isshow?'完成':'编辑'}}</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" width="200px" label="所需积分" property="marketPrice" >
          <template slot-scope="scope">
            <el-input v-show="isshow2" size="mini" v-model="scope.row.marketPrice" style="width:100px"></el-input>
            <span v-show="!isshow2">{{ scope.row.marketPrice }}</span>
            <el-button :type="isshow2?'success':'primary'" @click='isshow2=!isshow2' size="mini" icon="edit">{{isshow?'完成':'编辑'}}</el-button>
          </template>
        </el-table-column>


        <el-table-column align="center" width="200px" label="库存" >
          <template slot-scope="scope">
            <el-input v-show="isshow4" size="mini" v-model="scope.row.goodsSum" style="width:100px"></el-input>
            <span v-show="!isshow4">{{ scope.row.goodsSum }}</span>
            <el-button :type="isshow4?'success':'primary'" @click='isshow4=!isshow4' size="mini" icon="edit">{{isshow?'完成':'编辑'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="postGoods">确 定</el-button>
  </span>

    </el-dialog>

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
  const testData = [];

  const tags = [{id: 1, name: '新品上架'}, {id: 2, name: '热卖促销'}, {id: 3, name: '新客优惠'}];

  export default {
    components: {},
    name: 'GoodList',
    data() {
      return {
        isshow:false,
        isshow1:false,
        isshow2:false,
        isshow3:false,
        isshow4:false,
        goodsName:'',
        gridData: [],
        dialogTableVisible: false,
        tableHeight: 0,
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          title: undefined,
          status: undefined
        },
        goodStatus: [{label: '上架', value: 1}, {label: '下架', value: 0}],
        data2: [{
          value: 1,
          label: '一级 1',
          children: [{
            value: 4,
            label: '二级 1-1',
            children: [{
              value: 9,
              label: '三级 1-1-1'
            }, {
              value: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          value: 2,
          label: '一级 2',
          children: [{
            value: 5,
            label: '二级 2-1'
          }, {
            value: 6,
            label: '二级 2-2'
          }]
        }, {
          value: 3,
          label: '一级 3',
          children: [{
            value: 7,
            label: '二级 3-1'
          }, {
            value: 8,
            label: '二级 3-2'
          }]
        }],
        checkAllTag: true,
        checkedTags: [1, 2],
        tags: tags,
        isIndeterminateTag: true,
        checkAllStatus: true,
        checkedStatuss: [0, 1],
        isIndeterminateStatus: false,
        showAdvancedSearchPopover: false,
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
      postGoods(){
        var info={};
        info.goodsname=this.gridData[0].goodsName;
        info.typename=this.gridData[0].typeName;
        info.marketprice=this.gridData[0].marketPrice;
        info.memberprice=this.gridData[0].memberPrice;
        info.goodssum=this.gridData[0].goodsSum;
        info.id=this.gridData[0].id;
        this.listLoading=true;
        setTimeout(()=>{
          this.$store.dispatch('ControlGoods',info).then((res)=>{
            this.getList();
            this.listLoading=false;
            this.$message({
              type:'success',
              message:'成功'
            });
          }).catch((error)=>{
            this.listLoading=false;
            this.$message.error("失败");
          });
          this.dialogVisible=false;
        },2000);
      },


      handleModifyStatus(infos,result){
        this.listLoading=true;
        var info={};
        info.id=infos.id;
        info.isstart=result;
        setTimeout(()=>{
          this.$store.dispatch('PutCreatedGoodsData',info).then((res)=>{
            this.getList();
            this.listLoading=false;
            this.$message({
              type:'success',
              message:'成功'
            })
          }).catch((error)=>{
            this.listLoading=false;
            this.$message.error("失败");
          });
        },2000);
      },
      editGoods(info){
        console.log(info);
        this.gridData[0]=this.list[info];
        this.dialogTableVisible = true
      },
      handleDelete(info){
        this.$confirm('此操作将永远删除此商品，是否继续？','温馨提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.listLoading=true;
          setTimeout(()=>{
            this.$store.dispatch('DeleteCreatedGoods',info.id).then((res)=>{
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
      getList() {
        this.listLoading = true;
        setTimeout((items, total) => {
          var info={};
          info.page=this.listQuery.page;
          info.pagesize=this.listQuery.limit;
          this.$store.dispatch('GetCreatedGoodsData',info).then((res)=>{
            this.total=res.total;
            console.log(res);
            this.list=res.list;
          })
          this.listLoading = false;
        }, 1000);
        this.listLoading = false;

      },
      errormsg(msgerror) {
        this.$message.error(msgerror);
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
      handleCheckAllTagChange(event) {
        let tags = [];
        for (let tag of this.tags) {
          tags.push(tag.id);
        }
        this.checkedTags = event.target.checked ? tags : [];
        this.isIndeterminateTag = false;
      },
      handleCheckedTagsChange(value) {
        let checkedCount = value.length;
        this.checkAllTag = checkedCount === this.tags.length;
        this.isIndeterminateTag = checkedCount > 0 && checkedCount < this.tags.length;
      },
      handleCheckAllStatusChange(event) {
        let statuss = [];
        for (let tag of this.goodStatus) {
          statuss.push(tag.value);
        }
        this.checkedStatuss = event.target.checked ? statuss : [];
        this.isIndeterminateStatus = false;
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
          vm.getList();
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
