<template>
  <div class="compareBox" id="compareBox" @mouseup="onMouseup">
    <div class="userOldImg" :style="{ backgroundImage: `url(${smallImgSrc})` }"></div>
    <template v-if="imgSize.width < imgSize.height">
      <div
        class="upScaleImg"
        :style="{
          width: `${compareScale}%`,
          backgroundPosition: `right ${backgroundRight}px top 0px`,
          backgroundImage: `url(${bigImgSrc})`
        }"
      ></div>
    </template>
    <template v-else>
      <div class="upScaleImg2" :style="{ width: `${compareScale}%`, backgroundImage: `url(${bigImgSrc})`}"></div>
    </template>

    <img
      src="./image/line.png"
      class="sliderLine"
      draggable="false"
      :style="{right: `${compareScale}%`}"
      @mousedown="handleSliderDown"
    />
    <div class="before">
      <span>Before</span>
    </div>
    <div class="after">
      <span>After</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "Comparision",
  props: {
    smallImgSrc: {
      type: String,
      require: true,
    },
    bigImgSrc: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const compareScale = ref<number>(50);
    const boxwidth = ref<number>(375);
    const imgSize = ref({
      width: 100,
      height: 100,
    });

    // 图片宽小于高的情况下，图片的背景图左侧距离
    const backgroundRight = computed(() => {
      return boxwidth.value / 2 * (1 - imgSize.value.width / imgSize.value.height);
    });

    // 获取图片尺寸
    const getImgSize = () => {
      var img = new Image();
      img.src = props.smallImgSrc as string;
      img.onload = () => {
        imgSize.value = {
          width: img.width,
          height: img.height,
        }
      }
    }
    getImgSize();

    let moveX: number = 0;
    let startX: number = 0;
    let animationId: number | undefined;
    let compareBoxWidth: number = 0;
    if (compareBoxWidth == 0) {
      setTimeout(() => {
        if (document.getElementById("compareBox")) {
          compareBoxWidth = document.getElementById("compareBox")?.clientWidth as number;
          boxwidth.value = compareBoxWidth;
        }
      }, 200);
    }

    const handleSliderDown = (e: MouseEvent) => {
      console.log("handleSliderDown");
      startX = e.clientX; //鼠标距离可视区域的宽
      moveX = 0;
      if (document.getElementById("compareBox") && compareBoxWidth == 0) {
        compareBoxWidth = document.getElementById("compareBox")?.clientWidth as number;
        boxwidth.value = compareBoxWidth;
      }
      // console.log("compareBoxWidth", compareBoxWidth);
      window.addEventListener("mousemove", onMousemove);
      window.addEventListener("mouseup", onMouseup);
    }

    const onMousemove = (event: MouseEvent) => {
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }
      animationId = window.requestAnimationFrame(() => {
        moveX = event.clientX - startX;
        startX = event.clientX;
        if (startX !== 0) {
          const scale = (moveX / compareBoxWidth) * 100;
          if (compareScale.value - scale > 100) {
            compareScale.value = 100;
          } else if (compareScale.value - scale < 0) {
            compareScale.value = 0;
          } else {
            compareScale.value = compareScale.value - scale;
          }
          // console.log("moveX", moveX, scale, compareScale.value);
        }
      });
    }

    const onMouseup = () => {
      moveX = 0;
      startX = 0;
      animationId = undefined;
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
    }

    return {
      compareScale,
      boxwidth,
      imgSize,
      backgroundRight,
      handleSliderDown,
      onMouseup,
    }
  }
});



</script>

<style lang="less" scoped>
.compareBox {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.06);
}

.compareBox .oldImg {
  width: 100%;
  height: auto;
  position: relative;
  z-index: 10;
  pointer-events: none;
}

.compareBox .userOldImg {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
}

.compareBox .upScaleImg2 {
  width: 50%;
  height: 100%;
  position: absolute;
  z-index: 20;
  top: 0;
  right: 0;
  background-size: 375px auto;
  background-position: right center;
  background-repeat: no-repeat;
  pointer-events: none;
}

.compareBox .upScaleImg {
  width: 50%;
  height: 100%;
  position: absolute;
  z-index: 20;
  top: 0;
  right: 0;
  background-size: auto 100%;
  background-position-y: top;
  background-repeat: no-repeat;
  pointer-events: none;
}

.compareBox .upScaleImgBox {
  position: absolute;
  z-index: 20;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.compareBox .upScaleImgBody {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.sliderLine {
  position: absolute;
  z-index: 30;
  height: 100%;
  width: auto;
  right: 50%;
  transform: translateX(50%);
  top: 0;
  cursor: col-resize;
}

.before {
  position: absolute;
  z-index: 31;
  width: auto;
  top: 8px;
  left: 8px;
  background-color: #ddd;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
}

.after {
  position: absolute;
  z-index: 31;
  width: auto;
  top: 8px;
  right: 8px;
  background-color: #ddd;
  padding: 4px;
  border-radius: 4px;
  font-size: 12px;
}
</style>