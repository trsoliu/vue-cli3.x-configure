import Vue from "vue";
import Router from "vue-router";
import Util from "@/assets/js/libs/util";
//import Home from "./views/Home.vue";
//console.log(Router,77)
Vue.use(Router);

const router = new Router({
  mode: "hash",
  base: "mcdonalds",
  routes: [{
      path: "/",
      name: "login",
      meta: {
        title: "XX",
        key: "0",
        requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () =>
        import("./views/login/Login.vue")
    },
    {
      path: "/sessionLogs",
      name: "sessionLogs",
      meta: {
        title: "智能客服管理系统",
        key: "0",
        requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () =>
        import( /* webpackChunkName:"sessionLogs" */ "./views/external/sessionLogs/SessionLogs.vue")
    },
    {
      path: "/main",
      name: "main",
      redirect: {
        name: "XX" //
      },
      meta: {
        title: "",
        key: "1",
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import("./views/main/Main.vue"),
      children: []
    }
  ]
});

//***********路由拦截***************************************
router.beforeEach((to, from, next) => {
  //	console.log("from",from)
  //	from.name=="login" ? window.location.reload() : "";
  let xmtoken = window.sessionStorage.getItem("xmtoken"),
    ctoken = window.sessionStorage.getItem("ctoken");
  //	iView.LoadingBar.start();
  Util.title(to.meta.title);
  //有xmtoken且有ctoken且是内页或者路由指向登录页面 否则，重置到登录页面
  if (
    (!!xmtoken && !!ctoken && to.meta.requireAuth) ||
    to.name == "login" ||
    to.name == "sessionLogs"
  ) {
    // 判断该路由是否需要登录权限
    next();
  } else {
    next({
      name: "login"
    });
  }
});
//router.afterEach((to, from, next) => {
router.afterEach(() => {
  //	iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
export default router;