<template>
  <div class="index-container">
    <!-- <router-link to="/listDragSort">列表拖拽排序</router-link>
    <router-link to="/wordPop">聊天气泡框</router-link>
    <router-link to="/imageResolutionComparison">图片大小调整前后对比</router-link>
    <router-link to="/cropPngImage">截取PNG图片中实际包含图像内容的部分</router-link>
    <router-link to="/svgPolygonTopath">svg图片中，把polygon 怎么转path</router-link>
    <router-link to="/tensorflow-mobilenet">tensorflow使用 MobileNet 进行图像分类</router-link> -->

      <div id="hCaptcha" class="h-captcha"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const showLoading = ref(true);

onMounted(() => {
  console.log("hcaptcha", hcaptcha);
  const dom = document.getElementById("hCaptcha") as HTMLElement;
  hcaptcha.render(dom, {
    sitekey: '0f732b99-c1c2-43fb-824e-cbcb7fe7e4a3',
    theme: 'dark',
    callback: (checkResultToken: string) => {
      console.log("render-success", checkResultToken);
    },
    "open-callback": () => {
      console.log("open-hcaptcha");
      showLoading.value = false;
    },
    'error-callback': (error: any) => {
      console.error(error);
    },
  });
  window.addEventListener("storage", (e) => {
    console.log(e);
  });
});

</script>

<style lang="less" scoped>
.index-container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > a {
    line-height: 2;
    font-size: 18px;
    text-decoration: underline;
  }
}
</style>