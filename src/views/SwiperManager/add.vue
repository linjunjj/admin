<template>
  <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-width="100px" label-position="right">
      <sticky :className="'sub-navbar published'">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm()">保存
        </el-button>
        <el-button type="warning" @click="cancel()">取消</el-button>
      </sticky>

      <div class="createPost-main-container">


        <el-form-item label="是否启用" prop="linkType">
          <el-col :span="11" >
            <el-select v-model="postForm.linkType" placeholder="请选择轮播图状态"  >
              <el-option label="不启用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="轮播图资源" prop="image_uri">
          <el-col :span="24" >
            <el-upload
              class="upload-demo"
              ref="upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :limit="4"
              :before-upload="beforeAvatarUpload"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

            </el-upload>
          </el-col>
        </el-form-item>

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
  import {SingleSelectGoodDialog, MultiSelectGoodListDialog} from '../../components/GoodListDialog/index';

  export default {
    name: 'AddSwiper',
    components: {
      Sticky,
      CropAndUpload,
      MultiSelectGoodListDialog,
      SingleSelectGoodDialog,
      BackToTop
    },
    data() {
      return {
        showMultiSelectGoodListDialog: false,
        showSingleSelectGoodDialogDialog: false,
        goodMultiList: [],
        goodSingleList: [],
        postForm: {
          name: '',
          linkType: 1,
          image_uri: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入轮播图名称', trigger: 'blur' },
            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
          ],
          linkType: [
            { required: true, message: '请选择轮播图链接类型', trigger: 'blur' }
          ],
          image_uri: [
            { required: true, message: '请设置轮播图', trigger: 'blur' }
          ]
        },
        loading: false
      };
    },
    computed: {},
    created() {
    },
    filters: {
      statusFilter(status) {
        const statusMap = ['danger', 'success'];
        return statusMap[status];
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      submitForm() {
         this.listLoading=true;
         setTimeout(()=>{
           this.submitUpload();
         },2000)
      },
      cancel() {
        this.$router.go(-1);
      },
      beforeAvatarUpload(file) {
        console.log(file);

        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        let fd = new FormData();
        fd.append('id', this.postForm.linkType)
        fd.append('file', file)
        console.log(fd);
        console.log(this.postForm.linkType)
        this.$http.post('/api/banner/uploadBanner', fd).then((res) => {
          if (res.data.errorcode=="200"){
            this.listLoading = false;
            this.cancel();
          }else {
            this.$message.error("上传失败");
          }
        });
        return isJPG && isLt2M;
      },
      submitMutliSelectGood(selectGoodList) {
        this.goodMultiList.splice(0, this.goodMultiList.length, ...selectGoodList);
      },
      submitSingleSelectGood(selectGood) {
        this.goodSingleList.splice(0, this.goodMultiList.length, selectGood);
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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

