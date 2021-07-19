
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import AddFeed from "./views/AddFeed.vue";
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
    path: "/addfeed",
    name: "addfeed",
    component: AddFeed,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
