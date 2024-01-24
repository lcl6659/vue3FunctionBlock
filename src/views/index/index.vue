<template>
  <div class="index-container">
    <router-link to="/listDragSort">列表拖拽排序</router-link>
    <router-link to="/wordPop">聊天气泡框</router-link>
    <router-link to="/imageResolutionComparison">图片大小调整前后对比</router-link>
  </div>
</template>

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