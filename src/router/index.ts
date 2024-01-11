import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      meta: {},
      component: () => import("../views/index/index.vue"),
    },
    {
      path: "/listDragSort",
      name: "listDragSort",
      meta: {},
      component: () => import("../views/listDragSort/index.vue"),
    },
  ]
});

export default router;