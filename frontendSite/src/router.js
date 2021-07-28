import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Feed from "./views/Feed.vue";
import Articles from "./views/Articles.vue";

import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            public: true
        }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            public: true
        }
    },
    {
        path: "/feed",
        name: "feed",
        component: Feed,
        meta: {
            public: false
        }
    },
    {
        path: "/articles/:subscriptionId'",
        name: "articles",
        component: Articles,
        props: true,
        meta: {
            public: false
        }
    },
];

const router = new VueRouter({
    mode: "history",
    routes,

});

router.beforeEach((to, from, next) => {
    var authenticated = localStorage.getItem('loggedin');

    if (!to.meta.public) {
        if (authenticated) {
            next();
        } else {
            next({name: 'login'});
        }
    }
    else{
        if (!authenticated) {
            next();
        } else {
            next({name: 'feed'});
        }
    }
    next();
});
export default router;
