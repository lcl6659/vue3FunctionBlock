<template>
  <div
    class="word-pop-container need-bubble"
    :class="{'has-horn': showHorn}"
    v-if="textHtml"
  >
    <div class="show-horn" v-if="showHorn" >
      <img src="./image/chat.png" />
    </div>
    <div>
      <span v-html="textHtml"></span>
    </div>
    <div
      class="arrow-box"
      :class="{
        flip: wordPopConfigData.arrowPosition,
        'no-filp ': !wordPopConfigData.arrowPosition,
      }"
    >
      <i
        class="arrow"
        :class="{ flip: wordPopConfigData.arrowFlip }"
        :style="{ left: wordPopConfigData.arrowOffsetX + 'px' }"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "WordPop",
  props: {
    configData: {
      type: Object,
      require: true,
      default: (() => {}),
    }
  },
  setup(props) {
    const defaultConfigData = ref({
      text: "", // 对话文本
      boldTexts: [], // 加粗的文字
      showHorn: true, // 显示对话图标
      arrowPosition: false, // 箭头位置：fanse：下，true：上
      arrowFlip: false, // 箭头指向：false右，true：左
      arrowOffsetX: -40, // 箭头偏移，单位：像素，相对位置：对话框中间文职，正数向右偏移、负数向左偏移
    });

    const wordPopConfigData = computed(() => {
      return {
        ...defaultConfigData.value,
        ...props.configData,
      }
    });

    const textHtml = computed(() => {
      let htmlText = wordPopConfigData.value.text;
      wordPopConfigData.value.boldTexts.forEach(boldText => {
        if (boldText) {
          htmlText = htmlText.replaceAll(boldText, `<>${boldText}</>`);
        }
      });
      htmlText = htmlText.replaceAll("<>", `<span style="font-weight: 800;">`);
      htmlText = htmlText.replaceAll("</>", `</span>`);
      htmlText = htmlText.replaceAll("\n", `<br />`);
      return htmlText;
    });

    // 对话标识
    const showHorn = computed(() => {
      return Boolean(wordPopConfigData.value.showHorn || false);
    });


    return {
      wordPopConfigData,
      showHorn,
      textHtml,
    };
  },
});
</script>

<style lang="less" scoped>
.word-pop-container {
  width: auto;
  height: auto;
  position: relative;
  color: #000;
  letter-spacing: normal;
  text-align: left;
  white-space: nowrap;
  padding: 10px 18px;
  border-radius: 40px;
  display: inline-block;
  border: 3px solid #f2f2f2;
  &.has-horn {
    padding: 10px 18px 10px 43px;
  }
  .show-horn {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0px;
    bottom: 0px;
    left: 13px;
    margin: auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
    }
  }
  span {
    font-size: 18px;
    line-height: 1.2;
  }
  &.need-bubble {
    background-color: #fff;
  }
  .arrow-box {
    position: absolute;
    width: 30px;
    height: 20px;
    left: 50%;
    bottom: -20px;
    &.no-filp {
      transform: translateX(-50%);
    }
    &.flip {
      bottom: auto;
      top: 0;
      transform-origin: top center;
      transform: translateX(-50%) rotateX(180deg);
    }
  }
  .arrow {
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(./image/sweepWordArrow.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    bottom: 2.3px;
    &.flip {
      transform-origin: center;
      transform: rotateY(180deg);
    }
  }
}
</style>
