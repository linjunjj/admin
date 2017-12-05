import  axios from 'axios';
const imageinfo ={
  state:{
    imageinfo:''
  },
  mutations:{
    SET_IMAGEINFO :(state,imageinfo) =>{
      state.imageinfo=imageinfo;
    },
  },
  actions:{
    //消息显示
    SET_IAMEGInfos({commit},info){
      return new Promise((reslove,reject)=>{
        commit('SET_IMAGEINFO',info);
        reslove()
      })
    },
  }

}
export default imageinfo;
