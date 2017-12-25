import Cookies from 'js-cookie';
import  axios from  'axios';
axios.defaults.baseURL = 'http://localhost:8080/'
const user = {
  state: {
    token: Cookies.get('Admin-Token'),
    id: '',
    account:'',
    password:'',
    avatar: '',
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ID :(state,id) =>{
      state.id =id;
    },
    SET_ACCOUNT: (state,account) => {
      state.account = account;
    },
    SET_PASSWORD: (state,password) => {
      state.password = password;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },
  actions: {
    //获取积分商品
    GetCreatedGoodsData({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/credit/getcregoodsall',{
          params:{
            page:info.page,
            pagesize:info.pagesize,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=>{
          reject("网络错误");
        })
      })
    },
    //修改积分商品
    PutCreatedGoodsData({commit},info){
      return new Promise((reslove,reject)=>{
        axios.put('/credit/updatecreditgoods',
          info,
          {
            headers:{
              'Content-Type':'application/json'
            }
          }
        ).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            reslove(response.data.data);
          }else {
            reject(response.data.errormsg);
          }

        }).catch((error)=>{
          reject(error);
        })
      })

    },
    //删除积分商品
    DeleteCreatedGoods(info){
      return new Promise((reslove,reject)=>{
        axios.delete('/credit/deletecreditgods',{
          params:{
            id:info.id,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            reslove(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(function (error) {
          reject(error);
        })

      })
    },
    //添加积分商品
    AddCreditGoods({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/credit/addcreategoods',{
          params:{
            creditgood:info.creditgood,
            cregoodssum:info.cregoodssum,
            price:info.price,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=>{
          reject("网络错误");
        })
      })


    },


    //获取首页概览数据
    GetHeadImageData({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getHeaderData').then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=>{
          reject("网络错误");
        })
      })

    },


    //得到用户列表
    GetUserList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getUserAll',{
          params:{
            page:info.page,
            pageszie:info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if(code=="200"){
            resolve(response.data.data);
          } else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject("网络失败");
        })
      })
    },
    //获取用户概览
    GetUserImage(){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getUserAllImage').then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })
      })
    },
    //获取店家列表
    GetStoreList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStoreAll',{
          params:{
            page:info.page,
            pagesize:info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })
      })
    },
    //获取启用商家列表
    GetStoreStart({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStartStore',{
          params:{
            page:info.page,
            pagesize:info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })
      })
    },
    //获取禁用商家列表
    GetStopStore({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStopStore',{
          params:{
            page:info.page,
            pagesize:info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })
      })
    },
    //修改店铺的状态
    CantrolStore({commit},info){
      return new Promise((reslove,reject)=>{
        axios.put('/admin/updateStore',
          info,
          {
            headers:{
              'Content-Type':'application/json'
            }
          }
        ).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            reslove(response.data.data);
          }else {
            reject(response.data.errormsg);
          }

        }).catch((error)=>{
          reject(error);
        })
      })
    },
    //删除店铺
    DeletStore({commit},info){
      var id=info.id;
      return new Promise((reslove,reject)=>{
        axios.delete('/admin/deleteStore',{
          params:{
            id:id,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            reslove(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(function (error) {
          reject(error);
        })

      })


    },


    //获取商品列表
    GetGoodsList({commit}, info) {
      return new Promise((resolve, reject)=>{
        axios.get('/admin/getGoodsAll', {
          params: {
            page: info.page,
            pagesize: info.pagesize,
          }

        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){

            resolve(response.data.data);
          }else {
            reject(response.data.errormsg)
          }
        }).catch((error)=>{
          reject(error);
        })
      })
    },
    //获取商品状态数据
    GetStatusGoods({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStatusGoods',{
          params:{
            status:info.status,
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })
    },


    //获取所有订单
    GetOrderList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getOrderAll',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })
    },
    //获取所有的积分商品订单
    GetCreditOrderList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getcreditorder',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })
    },



    //获取订单概览
    GetOrderImage(){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getOrderImage').then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=>{
          reject("网络错误");
        })

      })
    },
    //获取订单状态数据
    GetStatusOrder({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStatusOrder',{
          params:{
            status:info.status,
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })
    },



    //获取交易概览
    GetDealImage(){

      return new Promise((resolve,reject)=>{
        axios.get('/admin/getDealImage').then(function (response) {
          var code=response.data.errorcode;
          if(code=="200"){
            resolve(response.data.data)
          }else {
            reject(response.data.errormsg);
          }
        }).catch((errir)=>{
          reject("网络错误");
        })

      })
    },



    //获取收入列表
    GetIncomeList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getIncomeList',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
    //获取收入状态
    GetStatusIncome({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStatusIncome',{
          params:{
            status:info.status,
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=> {
          reject("网络错误")
        })
      })
    },
    //获取支出列表
    GetOutcomeList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getOutcomeList',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })
    },
    //获取支出状态
    GetStatusOutcome({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStatusOutcome',{
          params:{
            status:info.status,
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=> {
          reject("网络错误")
        })
      })
    },


    //获取会员申请列表
    GetMemberList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getMemberApply',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
    //更改会员申请的状态
    UpdaeMember({commit},info){
      return new Promise((resolve,reject)=>{
        axios.put('/admin/updateMemberApply',info,{
          headers:{
            'Content-Type':'application/json'
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //删除会员申请
    DeleteMember({commit},info){

      return new Promise((resolve,reject)=>{
        axios.delete('/admin/deleteMemberApply',{
          params:{
            id:info.id,
          }
        }).then(function (response) {
          var  code =response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg)
          }
        }).catch((error)=>{
          reject(error);
        })
      })
    },
    //会员状态数据获取
    GetStatusMember({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStatusMember',{
          params:{
            status:info.status,
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=> {
          reject("网络错误")
        })

      })

    },




    //获取村村通申请列表
    GetVillageList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getVillageApply',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
    //更新村村通申请的状态
    UpdateVillage({commit},info){
      return new Promise((resolve,reject)=>{
        axios.put('/admin/updateVillageApply',info,{
          headers:{
            'Content-Type':'application/json'
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //村村通申请删除
    DeletVillage({commit},info){
      var  id=info.id;
      return new Promise((resolve,reject)=>{
        axios.delete('/admin/deleteVillage',{
          params:{
            id:id,
          }

        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //村村通状态的数据获取
    GetStatusVillage({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStatusVillage',{
          params:{
            status:info.status,
            page: info.page,
            pagesize: info.pagesize,

          }

        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }
        }).catch(()=>{
          reject("网络错误");
        })

      })
    },





    //获取商城申请列表
    GetStoreApplyList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStoreApply',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
    //更新商城申请的状态
    UpdateStoreApply({commit},info){
      return new Promise((resolve,reject)=>{
        axios.put('/admin/updateStoreApply',info,{
          headers:{
            'Content-Type':'application/json'
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //商城申请删除
    DeletStoreApply({commit},info){
      var  id=info.id;
      return new Promise((resolve,reject)=>{
        axios.delete('/admin/deleteStoreApply',{
          params:{
            id:id,
          }

        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //商城申请状态的数据获取
    GetStatusStoreApply({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStatusStoreApply',{
          params:{
            status:info.status,
            page: info.page,
            pagesize: info.pagesize,

          }

        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }
        }).catch(()=>{
          reject("网络错误");
        })

      })
    },



    //获取提现申请列表
    GetWithDrawList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getWithDrawApply',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
//    更新提现申请状态
    UpdateWithDrawApply({commit},info){
      return new Promise((resolve,reject)=>{
        axios.put('/admin/updateWithDrawApply',info,{
          headers:{
            'Content-Type':'application/json'
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //提现申请删除
    DeleteWithDrawApply({commit},info){
      var  id=info.id;
      return new Promise((resolve,reject)=>{
        axios.delete('/admin/deleteWithDraw',{
          params:{
            id:id,
          }

        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error)
        })
      })
    },
    //提现申请状态的数据获取
    GetStatusWithDraw({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/admin/getStatusWithDraw',{
          params:{
            status:info.status,
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }
        }).catch(()=>{
          reject("网络错误");
        })

      })
    },

//获取轮播图列表
    GetBanneList({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/banner/getbanner',{
          params:{
            page: info.page,
            pagesize: info.pagesize,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })

      })

    },
    //修改轮播图的状态
    ControlBanner({commit},info){
      return new Promise((reslove,reject)=>{
        axios.put('/banner/updateBanner',
          info,{
            headers:{
              'Content-Type': 'application/json',
            }
          }
        ).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            reslove(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch((error)=>{
          reject(error);
        })
      })
    },
    //删除轮播图
    DeleteBanner({commit},info){
      var id=info.id;
      return new Promise((reslove,reject)=>{
        axios.delete('/banner/deletebaner',{
          params:{
            id:id,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if (code=="200"){
            reslove(response.data.data);
          }else {
            reject(response.data.errormsg);
          }

        }).catch((error)=>{
          reject(error);
        })
      })
    },

    //获取积分比率
    Get_CreditRate({commit},info){
      return new Promise((resolve, reject) => {
        console.log(userInfo);
        axios.get('/admin/getRate').then(function (response) {
          var code=response.data.errorcode;
          if(code="200"){
            resolve(response.data.data);
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=>{
          reject("网络错误");
        })
      });

    },

    //更新积分比率
    Update_CreditRate({commit},info){
      axios.put('/admin/updateRate',
        info,{
          headers:{
            'Content-Type': 'application/json',
          }
        }
      ).then(function (response) {
        var  code=response.data.errorcode;
        if (code=="200"){
          reslove(response.data.data);
        }else {
          reject(response.data.errormsg);
        }
      }).catch((error)=>{
        reject(error);
      })
    },



    // 管理员登入
    LoginByAccount({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
         console.log(userInfo);
        axios.get('/admin/login',{
          params:{
            account:userInfo.account,
            passworld:userInfo.password,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if(code="200"){
            let timers=new Date().getTime();
            Cookies.set('Admin-token',timers+response.data.data.id);
            commit('SET_ID',response.data.data.id);
            commit('SET_ACCOUNT',response.data.data.account);
            commit('SET_PASSWORD',response.data.data.passworld);
            commit('SET_TOKEN',timers+response.data.data.id);
            resolve();
          }else {
            reject(response.data.errormsg);
          }
        }).catch(()=>{
          reject("网络错误");
        })
      });
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', ['admin']);
        commit('SET_AVATAR', 'http://oz4zfzmr0.bkt.clouddn.com/store3.jpg');
        resolve(['admin']);
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        Cookies.set('Admin-Token', role);
        resolve();
      });
    }
  }
};

export default user;
