const status ={
  state:{
    condition:'',
  },
  mutations:{
    SET_STATUS :(state,condition) =>{
      state.condition=condition;
    },

  },
  actions:{
    //状态的更改
    ChangeCondition({commit},info){
      return new Promise((resolve, reject)=>{
        commit('SET_STATUS',info);
           resolve();
      })
    }
  }

}
export default status;
