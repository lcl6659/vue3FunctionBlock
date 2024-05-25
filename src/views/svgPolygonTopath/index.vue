<template>

</template>

<script setup lang="ts">
const points = "8.52651283e-14 0 8.52651283e-14 590 423.599 590 423.599 451.201 162 451.201 162 360.4 389.201 360.4 389.201 228.8 162 228.8 162 138.8 423.599 138.8 423.599 0";
// 将 points 属性值转换为 path 元素的 d 属性值
var d = `M ${points} z`;

console.log(d)
</script>
