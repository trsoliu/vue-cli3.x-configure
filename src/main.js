import "amfe-flexible/index.js";
import Vue from "vue";
//import "normalize.css" //CSS resets
import App from "./App.vue";
import api from "./assets/js/plugins/axios"; //http ajax axios封装方法
import iview from "./assets/js/plugins/iview"; //iView UI
import router from "./router"; //路由管理
import store from "./vuex/store"; //状态管理

const env = process.env.NODE_ENV === "production" ? true : false; //生产环境和开发环境
Vue.prototype.$http = api; //全局绑定axios方法
Vue.config.silent = env ? true : false; //取消 Vue 所有的日志与警告。
Vue.config.productionTip = env ? true : false; //设置为 false 以阻止 vue 在启动时生成生产提示。

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
