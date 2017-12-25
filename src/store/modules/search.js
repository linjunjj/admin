import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080'
const search = {
    state: {
      condition:'',
    },
  mutations:{
    SET_CONDITION:(state,condition)=>{
      state.condition=condition;
    }


  },


  actions:{
    //  修改标题
    ChangCon({commit},info){

      return new Promise((resolve, reject)=>{
        commit('SET_CONDITION',info);
        resolve();
      })
    },

    //用户搜索
    GetSearchUser({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/search/searchUser',{
          params:{
            condition: info.condition,
            page:info.page,
            pagesize:info.pagesize,
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
    //用户状态搜索
    GetSearchUserStatus({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/search/searchUserStatus',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  //商品搜索
    GetSearchGoods({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/search/searchGoods',{
          params:{
            condition: info.condition,
            page:info.page,
            pagesize:info.pagesize,
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
  // 商品状态搜索
    GetSearchGoodsStatus({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/search/searchGoodsStatus',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  //  订单搜索
    GetSearchOrder({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/search/searchOrder',{
          params:{
            condition: info.condition,
            page:info.page,
            pagesize:info.pagesize,
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
  //  订单状态搜索
    GetSearchOrderStatus({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchOrderStatus',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  //收入搜索
    GetSearchIncome({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchIncome',{
          params:{
            condition: info.condition,
            page:info.page,
            pagesize:info.pagesize,
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
  //收入状态搜索
    GetSearchIncomeStatus({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchIncomeStatus',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  //  支出搜索
    GetSearchOutcome({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchOutcome',{
          params:{
            condition: info.condition,
            page:info.page,
            pagesize:info.pagesize,
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
  //支出状态搜索
    GetSearchOutcomeStatus({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchOutcomeStatus',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  //会员通知搜索
    GetSearchMemberApply({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchMember',{
          params:{
            condition: info.condition,
            page:info.page,
            pagesize:info.pagesize,
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
  //会员申请状态搜索
    GetSearchMemberApplyStatus({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/search/searchMenberStatus',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  // 商城申请
    GetSearchStoreApply({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchStoreApply',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  //商城状态申请搜索
    GetSearchStoreApplyStatus({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchStoreApplyStatus',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  //村村通搜索
    GetSearchVillageApply({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchVillage',{
          params:{
            condition: info.condition,
            page:info.page,
            pagesize:info.pagesize,
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
  // 村村通状态搜索
    GetSearchVillageApplyStatus({commit},info){

      return new Promise((resolve,reject)=>{
        axios.get('/search/searchVillageStatus',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  // 提现申请搜索
    GetSearchWithdrawApply({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/search/searchWithDraw',{
          params:{
            condition: info.condition,
            page:info.page,
            pagesize:info.pagesize,
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
  // 提现状态申请搜索
    GetSearchWithdrawApplyStatus({commit},info){
      return new Promise((resolve,reject)=>{
        axios.get('/search/searchWithDrawStatus',{
          params:{
            condition: info.condition,
            status:info.status,
            page:info.page,
            pagesize:info.pagesize,
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
  }
}
export default  search;
