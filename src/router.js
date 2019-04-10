import Vue from "vue";
import Router from "vue-router";
import store from "./store";
Vue.use(Router);

const router=new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component:resolve=>require(['./views/Home.vue'],resolve),
    },
    {
      path:"/Scanning",
      name:"Scanning",
      //  meta: {  // 需要登录才能进入的页面可以增加一个meta属性
      //      requireAuth: true
      //    },
      component:resolve=>require(['./views/Scanning'],resolve),
    },
    {
      path:"/settle",
      name:"settle",
      meta: {  // 需要登录才能进入的页面可以增加一个meta属性
        requireAuth: true
      },
      component:resolve=>require(['./views/Settle'],resolve),
    },
    //智慧门店收银首页
    {
      path:'/wisdommian',
      name:"wisdommian",
      meta:{
         // requireAuth:true
      },
      component:resolve=>require(['./views/wisdomMian'],resolve),
    }
  ],


})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    if (store.state.information.postaccessToken) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/',
        // query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})



// 增强原方法，好处是旧的业务模块不需要任何变动
Router.prototype.go = function () {
  this.isBack = true
  window.history.go(-1)
}

// 或者你可以新建一个方法
Router.prototype.goBack = function () {
  this.isBack = true
  this.go(-1)
}


export  default router;