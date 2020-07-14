import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export const childrenRoute = [
  {
    path: "/dashboard",
    component: () => import(/* webpackChunkName: "Dashboard" */ "@/views/dashboard//View.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import(/* webpackChunkName: "Dashboard" */ "@/views/dashboard/Dashboard.vue"),
      }
    ]
  },
  {
    path: "/system",
    meta: {
      icon: "el-icon-location",
      link: false,
      title: "系统管理"
    },
    component: () => import(/* webpackChunkName: "system" */ "@/views/system/View.vue"),
    redirect: "/system/userAdmin",
    children: [
      {
        path: "userAdmin",
        name: "userAdmin",
        meta: {
          icon: "el-icon-location",
          link: false,
          title: "用户管理"
        },
        component: () => import(/* webpackChunkName: "system" */ "@/views/system/UserAdmin.vue")
      }
    ]
  },
]
const routes = [
  {
    path: "/",
    meta: {
      title: "首页"
    },
    redirect: '/dashboard',
    component: () => import(/* webpackChunkName: "index" */ "@/views/Index.vue"),
    children: childrenRoute
  },
  {
    path: "/login",
    name: "login",
    meta: {
      breadcrumb: false
    },
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
