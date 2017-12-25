import  axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080'

const info ={
  state:{
    memberApply:'',
    storeApply:'',
    villageApply:'',
    withDrawApply:'',
  },
  mutations:{
    SET_MEMBER :(state,member) =>{
      state.memberApply=member;
    },
    SET_STORE :(state,store)=>{
      state.storeApply=store;

    },
    SET_VILLAGE:(state,village)=>{
      state.villageApply=village;
    },
    SET_WITHDRAW:(state,withdraw)=>{
      state.withDrawApply=withdraw;
    }

  },
  actions:{
    //消息显示
    GetInfos({commit},info){
      return new Promise((reslove,reject)=>{
        axios.get('/admin/getinfo',{
          params:{
            status:info,
          }
        }).then(function (response) {
          var  code=response.data.errorcode;
          if (code=="200"){
            reslove(response.data.data);
          commit('SET_MEMBER',response.data.data.memberinfo);
            commit('SET_STORE',response.data.data.storeapplyinfo);
            commit('SET_VILLAGE',response.data.data.villageinfo);
            commit('SET_WITHDRAW',response.data.data.withdrawinfo);
          }else {
            reject(response.data.errormsg)
          }
        }).catch((error)=>{
          reject("网络错误");
        })
      })
    },
  }

}
export default info;
