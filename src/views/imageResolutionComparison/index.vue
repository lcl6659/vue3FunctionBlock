<template>
  <div class="compare-container">
    <div>
      <span>横图</span>
      <div class="component-box">
        <comparison :big-img-src="bigImgSrc1" :small-img-src="smallImgSrc1" />
      </div>
    </div>
    <div>
      <span>方图</span>
      <div class="component-box">
        <comparison :big-img-src="bigImgSrc2" :small-img-src="smallImgSrc2" />
      </div>
    </div>
    <div>
      <span>竖图</span>
      <div class="component-box">
        <comparison :big-img-src="bigImgSrc3" :small-img-src="smallImgSrc3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import comparison from './comparison.vue';

export default {
  name: "ImageResolutionComparison",
  components: {
    comparison,
  },
  setup() {
    return {
      smallImgSrc1: new URL("./image/1.jpeg", import.meta.url).href,
      bigImgSrc1: new URL("./image/1_big.jpg", import.meta.url).href,
      smallImgSrc2: new URL("./image/2.jpeg", import.meta.url).href,
      bigImgSrc2: new URL("./image/2_big.jpeg", import.meta.url).href,
      smallImgSrc3: new URL("./image/3.jpeg", import.meta.url).href,
      bigImgSrc3: new URL("./image/3_big.jpeg", import.meta.url).href,
    };
  },
};
</script>

<style lang="less" scoped>
.compare-container {
  height: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  >div {
    text-align: center;
    span {
      line-height: 60px;
    }
  }
  .component-box {
    position: relative;
    width: 375px;
    height: 375px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 0 15px;
  }
}
</style>