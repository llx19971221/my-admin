import Vue from "vue";
import Vuex from "vuex";
import fnObj from "@/until/request";
import ls from "@/until/ls";
import { Message } from "element-ui";
const {
  login
} = fnObj;

// console.log(login)
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {}
  },
  mutations: {},
  actions: {
    async login(state, payload) {
      const {flag, data, token} = await login(payload);
      state.userData = data;
      if(flag) {
        ls.set('token', token)
        Message.success("欢迎您，尊敬的管理" + data.userName);
      }
      return flag;
    }
  },
  modules: {}
});
