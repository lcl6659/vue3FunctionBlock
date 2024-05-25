<template>
  <div>tensorFlow 图像分类</div>
  <div>
    <img style="width: 200px;" id="image" src="../images/1_big.jpg" alt="">
  </div>
  <button @click="start">开始</button>
  <div v-for="prediction in predictions" :key="prediction.label">
    {{ prediction.label }}: {{ prediction.confidence }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import * as mobilenet from '@tensorflow-models/mobilenet';

const predictions = ref<any[]>([]);
const model = ref<any>(null);

const version = 2;
const alpha = 0.5;

const start = async () => {
  if (!model.value) {
    model.value = await mobilenet.load({version, alpha});
    console.log(model.value);
    const img = document.getElementById("image");
    predictions.value = await model.value.infer(img, true);
  }
}

</script>
