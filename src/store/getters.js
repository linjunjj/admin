const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  memberinfo: state=>state.info.memberApply,
  storesapplyinfo: state=>state.info.storeApply,
  villageinfo:state=>state.info.villageApply,
  withdrawinfo:state=>state.info.withDrawApply,
   status: state=>state.status.condition,
};
export default getters;
