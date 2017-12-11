<template>
  <div class="createPost-container" v-loading="listLoading">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="80px"
             label-position="right">
      <sticky :className="'sub-navbar published'">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">保存
        </el-button>
        <el-button type="warning" @click="cancel()">取消</el-button>
      </sticky>
      <div class="createPost-main-container">
        <!--基本信息-->
        <h3>基本信息</h3>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="postForm.name" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-table :data="postForm.skus" border fit highlight-current-row style="width: 97%">

          <el-table-column align="center" width="200px" label="积分">
            <template slot-scope="scope">
              <el-input-number :controls="false" size="small" v-model="scope.row.name" :min="0"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column align="center" width="300px" label="库存">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.stock" :min="0"></el-input-number>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作" width="120">
            <template slot-scope="scope">
              <el-button size="small" type="danger" icon="delete" @click="doempty">清空</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--商品图片-->
        <h3>商品图片<span style="font-size: 12px;color: darkgrey;">只能一张，默认第一张图片</span></h3>

        <el-upload
          class="upload-demo"
          ref="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :limit="1"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

        </el-upload>

        <el-dialog v-model="showImagePreview" size="tiny">
          <img width="100%" :src="previewImageUrl" alt="">
        </el-dialog>
      </div>
    </el-form>

    <el-tooltip placement="top" content="回到顶部">
      <back-to-top transitionName="fade" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
  import BackToTop from '../../components/BackToTop/index.vue';
  import Sticky from '../../components/Sticky/index.vue';
  import {CropAndUpload} from '../../components/ImageUpload';
  import sortable from 'html5sortable';
  import wangeditor from 'wangeditor';

  export default {
    name: 'AddGood',
    components: {
      Sticky,
      CropAndUpload,
      BackToTop
    },
    data() {
      return {
        listLoading:false,
        fileList:[],
        textarea: '',
        id:'',
        postForm: {
          name: '',
          categoryId: undefined,
          unitId: undefined,
          tags: [],
          skus: [{name: 0, stock: 0, price: 0}]
        },
        rules: {
          name: [
            {required: true, message: '请输入积分商品名称', trigger: 'blur'}
          ],
          categoryId: [
            {required: true, message: '请选择商品分类', trigger: 'blur'}
          ],
          unitId: [
            {required: true, message: '请选择商品单位', trigger: 'blur'}
          ],
          skus: [
            {required: true, message: '请设置商品单位', trigger: 'blur'}
          ]
        },
        loading: false,

        checkAllTag: true,
        isIndeterminateTag: true,
        showImagePreview: false,
        previewImageUrl: '',
        goodid:'8',
      };
    },
    computed: {},
    created() {
      this.$nextTick(() => {
        sortable('.el-upload-list--picture-card', {
          items: '.el-upload-list__item',
          forcePlaceholderSize: true,
          placeholderClass: 'my-sortable-placeholder'
        });
        sortable('.el-upload-list--picture-card')[0].addEventListener('sortupdate', (e) => {
          // 调整图片顺序后，更新图片列表数组
          console.log(`e.detail.index: ${e.detail.index}`);
          console.log(`e.detail.oldindex: ${e.detail.oldindex}`);
        });
      });
    },
    mounted() {
      this.editor = new wangeditor('#editor');
      this.editor.create();
    },
    filters: {},
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },

      doempty() {
        this.postForm.skus[0].name = 0;
        this.postForm.skus[0].stock = 0;
        this.postForm.skus[0].price = 0;
      },

      submitForm() {
        this.listLoading = true;
        setTimeout((items, total) => {
          var infos = {};
          infos.creditgood = this.postForm.name;
          infos.price = this.postForm.skus[0].stock;
          infos.cregoodssum = this.postForm.skus[0].name;
          console.log(infos);
          this.$store.dispatch('AddCreditGoods', infos).then((res) => {
            this.id=res.id;
            console.log(this.id);
            this.submitUpload();
          }).catch((error) => {
            this.$message.error(error);
          })
          this.listLoading = false;
        }, 1000);
      },


      cancel() {
        this.$router.go(-1);
      },
      handleCheckAllTagChange(event) {
        let tags = [];
        for (let tag of this.tags) {
          tags.push(tag.id);
        }
        this.postForm.tags = event.target.checked ? tags : [];
        this.isIndeterminateTag = false;
      },
      handleCheckedTagsChange(value) {
        let checkedCount = value.length;
        this.checkAllTag = checkedCount === this.tags.length;
        this.isIndeterminateTag = checkedCount > 0 && checkedCount < this.tags.length;
      },
      addSku() {
        this.postForm.skus.push({name: '', stock: 1, price: 1});
      },
      handlePictureRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.previewImageUrl = file.url;
        this.showImagePreview = true;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        console.log("阿诗丹顿放松放松")
        let fd = new FormData();
        fd.append('id', this.id)
        fd.append('file', file)
        console.log(fd);
        console.log("阿诗丹顿放松放松")

        this.$http.post('/api/credit/uploadImage', fd).then((res) => {
          console.log(res)
          this.listLoading = false;
          this.cancel();
          return isJPG && isLt2M;
        });
        return isJPG && isLt2M;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/css/mixin.scss";
  .title-prompt {
    position: absolute;
    right: 0px;
    font-size: 12px;
    top: 10px;
    color: #ff4949;
  }

  .createPost-container {
    position: relative;
  .createPost-main-container {
    margin: 20px;
  .my-sortable-placeholder{
    height: 148px;
    display: inline-block;
    width: 148px;
    border: 1px dashed #ccc;
    margin: 0 8px 8px 0;
    border-radius: 6px;
  }

  h3 {
    color: #03b8cc;
    font-size: inherit;
    font-weight: 400;
    margin-bottom: 10px;
    margin-top: 30px;
  }
  .postInfo-container {
    position: relative;
  @include clearfix;
    margin-bottom: 10px;
  .postInfo-container-item {
    float: left;
  }
  }
  .editor-container {
    min-height: 500px;
    margin: 0 0 30px;
  .editor-upload-btn-container {
    text-align: right;
    margin-right: 10px;
  .editor-upload-btn {
    display: inline-block;
  }
  }
  }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
  }
</style>

