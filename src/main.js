import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementUi from "element-ui";
// import * as d3 from "d3";
// import "element-ui/lib/theme-chalk/index.css";
import "@assets/css/reset.css";
import { initColor } from "@/until/themeColorClient";
initColor()
Vue.use(elementUi);
// Vue.prototype.$d3 = d3;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

