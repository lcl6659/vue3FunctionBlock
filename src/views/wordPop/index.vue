<template>
  <div class="word-pop-demo-container">
    <wordPop :configData="wordPopConfigData" />
    <div class="config-box">
      <div class="item">
        <div class="label">对话文本</div>
        <div class="input-box">
          <textarea v-model="wordPopConfigData.text" cols="30" rows="3"></textarea>
          <div class="tip">（操作提示：回车换行）</div>
        </div>
      </div>
      <div class="item">
        <div class="label">加粗文本</div>
        <div class="input-box">
          <div class="flex-box">
            <input type="text" v-model="boldText">
            <button @click="addBoldText">添加</button>
          </div>
          <div class="bold-text-list">
            <span v-for="(text, index) in wordPopConfigData.boldTexts" :key="text">
              <span>{{ text }}</span>
              <span class="remove" @click="removeBoldText(index)">×</span>
            </span>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">显示图标</div>
        <div class="input-box">
          <input type="checkbox" v-model="wordPopConfigData.showHorn">
        </div>
      </div>
      <div class="item">
        <div class="label">箭头方向</div>
        <div class="input-box">
          <input type="radio" :value="true" v-model="wordPopConfigData.arrowFlip">
          <span style="margin-right: 20px;">朝右</span>
          <input type="radio" :value="false" v-model="wordPopConfigData.arrowFlip">
          <span>朝左</span>
        </div>
      </div>
      <div class="item">
        <div class="label">箭头位置</div>
        <div class="input-box">
          <input type="radio" :value="true" v-model="wordPopConfigData.arrowPosition">
          <span style="margin-right: 20px;">对话框上方</span>
          <input type="radio" :value="false" v-model="wordPopConfigData.arrowPosition">
          <span>对话框下方</span>
        </div>
      </div>
      <div class="item">
        <div class="label">箭头偏移</div>
        <div class="input-box">
          <input v-model="wordPopConfigData.arrowOffsetX" type="number" />
          <div class="tip">（操作提示：单位：像素，相对位置：对话框中间位置，正数向右偏移、负数向左偏移）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import wordPop from "./wordPop.vue";

export default defineComponent({
  name: "WordPopIndex",
  components: {
    wordPop,
  },
  setup() {
    const wordPopConfigData = ref({
      text: "2024年，你有什么打算？\n我准备回老家了！",
      boldTexts: ["2024", "回老家"], // 加粗的文字
      showHorn: true, // 显示对话图标
      arrowPosition: false, // 上下
      arrowFlip: false, // 左右
      arrowOffsetX: 0, // 箭头偏移
    });

    const boldText = ref("");

    const addBoldText = () => {
      if (boldText.value && !wordPopConfigData.value.boldTexts.includes(boldText.value)) {
        wordPopConfigData.value.boldTexts.push(boldText.value);
      }
    }

    const removeBoldText = (index: number) => {
      wordPopConfigData.value.boldTexts.splice(index, 1);
    }

    return {
      wordPopConfigData,
      boldText,
      addBoldText,
      removeBoldText,
    };
  },
});
</script>

<style lang="less" scoped>
.word-pop-demo-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .config-box {
    width: 400px;
    min-height: 300px;
    border: 1px solid #ddd;
    margin-left: 50px;
    border-radius: 10px;
    padding: 15px;
    .item {
      display: flex;
      margin-bottom: 15px;
      .label {
        margin-right: 10px;
        font-size: 14px;
      }
      .input-box {
        flex: 1;
        input[type='text'], input[type='number'] {
          height: 30px;
          padding-left: 10px;
          flex: 1;
        }
        textarea {
          width: 100%;
        }
        button {
          width: 100px;
          margin-left: 10px;
          cursor: pointer;
        }
        .tip {
          font-size: 13px;
          color: #aaa;
        }
        .bold-text-list {
          >span {
            display: inline-flex;
            border: 1px solid #ddd;
            margin: 10px 10px 0 0;
            padding: 5px 20px;
            border-radius: 5px;
            align-items: center;
            .remove {
              display: inline-flex;
              width: 15px;
              height: 15px;
              background-color: red;
              color: #fff;
              justify-content: center;
              align-items: center;
              margin-left: 5px;
              border-radius: 50%;
              font-size: 12px;
              cursor: pointer;
            }
          }
        }
      }
      .flex-box {
        display: flex;
      }
    }
  }
}
</style>
