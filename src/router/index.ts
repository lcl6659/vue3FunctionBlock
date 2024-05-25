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
    {
      path: "/wordPop",
      name: "wordPop",
      meta: {},
      component: () => import("../views/wordPop/index.vue"),
    },
    {
      path: "/imageResolutionComparison",
      name: "imageResolutionComparison",
      meta: {},
      component: () => import("../views/imageResolutionComparison/index.vue"),
    },
    {
      path: "/tensorflow-mobilenet",
      name: "tensorflowMobilenet",
      meta: {},
      component: () => import("../views/tensorFlow/mobileNet/index.vue"),
    },
    {
      path: "/cropPngImage",
      name: "cropPngImage",
      meta: {},
      component: () => import("../views/cropPngImage/index.vue"),
    },
    {
      path: "/svgPolygonTopath",
      name: "svgPolygonTopath",
      meta: {},
      component: () => import("../views/svgPolygonTopath/index.vue"),
    },
  ]
});

export default router;