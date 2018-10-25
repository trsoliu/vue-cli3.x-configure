import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import common from "./modules/common";
import login from "./modules/login";

export default new Vuex.Store({
  modules: {
    common,
    login,
  }
});
