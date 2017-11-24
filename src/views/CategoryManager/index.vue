<template>
  <div class="app-container calendar-list-container">

    <el-tree :data="data2" :props="defaultProps" @node-click="handleNodeClick"  node-key="value" ></el-tree>

    <el-dialog :title="isNewCategoryDialog? '新增分类':'编辑分类'" :visible.sync="showNewOrEditDialog">
      <el-form :model="category">
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="category.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" label-width="120px">
          <el-cascader
            expand-trigger="hover"
            :options="data2"
            v-model="category.parent"
            @change="handleChangeParentCategory">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showNewOrEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="showNewOrEditDialog = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/jsx">
  import {SimpleConfirmDialog} from '../../components/ConfirmDialog';

  export default {
    name: 'CategoryManager',
    components: {
      SimpleConfirmDialog
    },
    data() {
      return {
        category: {
          name: '',
          parent: undefined
        },
        isNewCategoryDialog: false,
        confirmContent: '',
        showNewOrEditDialog: false,
        showConfrmDialog: false,
        data2: [{
          value: 1,
          label: '主商城',
          children: [{
            value: 13,
            label: '鱼禽肉蛋',
          },
            {
              value: 14,
              label: '蔬菜水果',
            },
            {
              value: 15,
              label: '园林花卉',
            },
            {
              value: 16,
              label: '粮油食品',
            },
            {
              value: 17,
              label: '农机设备',
            },
            {
              value: 18,
              label: '生态花果',
            },
            {
              value: 19,
              label: '土地改良',
            },
            {
              value: 20,
              label: '有机种植',
            },{
              value: 21,
              label: '农副产品',
            },{
              value: 22,
              label: '虫草药材',
            }

          ]

        }, {
          value: 2,
          label: '综合商城',
          children: [{
            value: 3,
            label: '食品保健'
          },{
            value: 4,
            label: '美容护理',
          },
            {
              value: 5,
              label: '手机数码',
            },
            {
              value: 6,
              label: '装修建材',
            },
            {
              value: 7,
              label: '男女服饰',
            },
            {
              value: 8,
              label: '鞋帽箱包',
            },
            {
              value: 9,
              label: '饰品摆件',
            },
            {
              value: 10,
              label: '珠宝首饰',
            },{
              value: 11,
              label: '日用刚需',
            },{
              value: 12,
              label: '母婴童装',
            }]
        }, {
          value: 3,
          label: '自营区',
          children: [{
            value: 7,
            label: '二级 3-1'
          }, {
            value: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    props: {},
    computed: {},
    created() {
    },
    filters: {},
    methods: {
      renderContent(h, {node, data, store}) {

      },
      append() {
        this.isNewCategoryDialog = true;
        this.showNewOrEditDialog = true;
      },
      edit() {
        this.isNewCategoryDialog = false;
        this.showNewOrEditDialog = true;
      },
      remove(store, data) {
        // this.confirmContent = `你确定要删除分类${data.label}吗？`;
        this.showConfrmDialog =true;
      },
      handleChangeParentCategory() {
      }
    }
  };
</script>
<style scoped>

</style>
