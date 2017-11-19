import Cookies from 'js-cookie';

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

        GetUserList({commit},info){
          return new Promise((resolve,reject)=>{
            axios.get('/api/admin/getUserAll',{
              params:{
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






    // 管理员登入
    LoginByAccount({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        let timerss=new Date().getTime();

        commit('SET_TOKEN',timerss);

        axios.get('/api/admin/login',{
          params:{
            admin:userInfo.admin,
            passworld:userInfo.password,
          }
        }).then(function (response) {
          var code=response.data.errorcode;
          if(code="200"){
            let timers=new Date().getTime();
            Cookies.set('Admin-token',timers);
            commit('SET_ID',response.data.data.id);
            commit('SET_ACCOUNT',response.data.data.account);
            commit('SET_PASSWORD',response.data.data.passworld);
            commit('SET_TOKEN',timers);
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
        commit('SET_AVATAR', 'https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=%E7%AE%A1%E7%90%86%E5%91%98&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&cs=3097986604,2363389459&os=2062706154,1126271128&simid=3323358115,265776553&pn=146&rn=1&di=98588474710&ln=1980&fr=&fmq=1511014829210_R&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=5a&hs=2&objurl=http%3A%2F%2Fp1.so.qhmsg.com%2Ft010ff7ddb45b60e4c6.png&rpstart=0&rpnum=0&adpicid=0');
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
