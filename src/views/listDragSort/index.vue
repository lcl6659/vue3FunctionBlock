<template>
  <div class="card-list">
    <div class="card-item" :class="{ 'drag-over': dragOverIndex === index, 'active': dragData.index == index }"
      v-for="(item, index) in dataList" :key="index" draggable="true" @dragstart.stop="onDragStart(index)"
      @dragover.stop="onDragOver($event, index)" @dragend.stop="onDragend">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dataList = ref<string[]>([
  "字母A",
  "字母B",
  "字母D",
  "p",
]);

const dragData = ref<any>({});
const onDragStart = (index: number) => {
  dragData.value = {
    index,
  }
}
const dragOverIndex = ref(-1);
const onDragOver = (e: any, index: number) => {
  e.preventDefault();
  if (dragData.value.index != index) {
    dragOverIndex.value = index;
  } else {
    dragOverIndex.value = -1;
  }
}
const onDragend = (e: any) => {
  e.preventDefault();
  const dragIndex = dragData.value.index;
  // console.log('onDragend', dragIndex, dragOverIndex.value);
  if (dragIndex != dragOverIndex.value && dragOverIndex.value != -1) {
    const dragItem = dataList.value[dragIndex];
    // console.log('dragItem', dragItem);
    if (dragOverIndex.value > dragIndex) {
      dataList.value.splice(dragOverIndex.value + 1, 0, dragItem);
      dataList.value.splice(dragIndex, 1);
    } else {
      dataList.value.splice(dragIndex, 1);
      dataList.value.splice(dragOverIndex.value, 0, dragItem);
    }
  }
  dragOverIndex.value = -1;
  dragData.value = {};
}
</script>

<style lang="less" scoped>
.card-list {
  padding: 30px;

  .card-item {
    border: 1px solid transparent;
    position: relative;
    padding: 10px 0;

    // 拖拽的样式
    &.active {
      background-color: #f2f2f2;
    }

    // 拖拽经过元素的样式
    &.drag-over {
      background-color: #ddd;
      border: 1px solid #aaa;
    }

    span {
      cursor: pointer;
    }
  }
}
</style>