import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';
import info from  './modules/info';
import  status from './modules/status'
import search from './modules/search'
import imageinfo from  './modules/imageinfo'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    info,
    permission,
    search,
    status,
    imageinfo,
  },
  getters
});

export default store;
