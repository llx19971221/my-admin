import fnObj from "@/until/request";
// import ls from "@/until/ls";
// import userControl  from "./userControl.js";
// import { Message } from "element-ui";
const {
  userControlQueryAll
} = fnObj;
export default {
    namespaced: true,
    state: {
      loginInfoList: []
    },
    mutations: {

    },
    actions: {
        async userControlQueryAll({state}, payload) {
            const {flag, data} = await userControlQueryAll();
            if(flag) {
                state.loginInfoList = data;
            }
        }
    }
};