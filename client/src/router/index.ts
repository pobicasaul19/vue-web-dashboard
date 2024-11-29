import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ "../layout/AppLayout.vue"),
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: "/",
        name: "\u2015 Dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */ "../views/HomeView.vue"),
      },
      {
        path: "/media",
        name: "\u2015 All Media",
        component: () => import(/* webpackChunkName: "all-media" */ "../views/AllMediaView.vue"),

      },
    ]
  },
  {
    path: "/account/login",
    name: "\u2015 Log-in",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = 'Writer/Editor Dashboard' + String(to.name);
  const authRequired = to.matched.some((route) => route.meta.authRequired);
  if (!authRequired) return next()
  useAuthStore().isAuthenticated ? next() : next('/account/login')
});

export default router