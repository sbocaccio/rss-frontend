
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Feed from "./views/Feed.vue";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component:Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/feed",
    name: "feed",
    component: Feed,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
