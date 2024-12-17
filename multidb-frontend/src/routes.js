import users from "./pages/UsersPage.vue"
import login from "./pages/LoginPage.vue";
import register from "./pages/RegisterPage.vue"
import privateData from "./pages/PrivateData.vue"
import allData from "./pages/AllDataPage.vue"
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {path: "/users", name: 'users', component: users, meta: { requiresAuth: true}},
    {path: "/allData", component: allData, meta: { requiresAuth: true}},
    {path: "/privateData", component: privateData, meta: { requiresAuth: true}},
    {path: "/register", component: register},
    {path: "/login", name: 'login', component: login},
]

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("token");
    if (to.matched.some((route) => route.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next("/login");
            return;
        }
    }
    const isAdmin = localStorage.getItem("role") === "ADMIN";
    if (to.matched.some((route) => route.meta.requiresAdmin)) {
        if (!isAdmin) {
            next("/error");
            return;
        }
    }
    next();
});

export default router;