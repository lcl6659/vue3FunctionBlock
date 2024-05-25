<template>
  <div id="container">
    <img src="/images/png_demo.png" alt="" srcset="" style="border: 1px solid red;">
  </div>
</template>

<script setup lang="ts">
// 假设你已经有了一个图片的URL  
const imageUrl = '/images/png_demo.png';  
  
// 加载图片  
const img = new Image();  
img.onload = function() {  
    // 创建Canvas元素和渲染上下文  
    const canvas = document.createElement('canvas');  
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;  
  
    // 将图片绘制到Canvas上  
    canvas.width = img.width;  
    canvas.height = img.height;  
    ctx.drawImage(img, 0, 0, img.width, img.height);  
  
    // 获取像素数据  
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);  
    const data = imageData.data;  
  
    // 初始化边界变量  
    let top = canvas.height, left = canvas.width, right = 0, bottom = 0;  
  
    // 分析像素数据，找出非透明像素的位置  
    for (let y = 0; y < canvas.height; y++) {  
        for (let x = 0; x < canvas.width; x++) {  
            const index = (y * canvas.width + x) * 4;  
            const alpha = data[index + 3];  
  
            // 如果像素不是完全透明的（即alpha值大于0），则更新边界  
            if (alpha > 0) {  
                if (x < left) left = x;  
                if (x > right) right = x;  
                if (y < top) top = y;  
                if (y > bottom) bottom = y;  
            }  
        }  
    }  
  
    // 根据找到的边界创建一个新的Canvas，并截取内容  
    const croppedCanvas = document.createElement('canvas');  
    croppedCanvas.width = right - left + 1;  
    croppedCanvas.height = bottom - top + 1;  
    const croppedCtx = croppedCanvas.getContext('2d') as CanvasRenderingContext2D;  
  
    // 绘制截取的内容到新的Canvas上  
    croppedCtx.drawImage(canvas, left, top, croppedCanvas.width, croppedCanvas.height, 0, 0, croppedCanvas.width, croppedCanvas.height);  
  
    // 将截取的图片转换为数据URL  
    const croppedImageDataURL = croppedCanvas.toDataURL('image/png', 1);
  
    // 现在可以使用croppedImageDataURL来显示或保存截取的图片了  
    // 例如，创建一个新的Image元素并设置其src为croppedImageDataURL  
    const newImg = new Image();  
    newImg.src = croppedImageDataURL;  
    newImg.setAttribute("style", "border: 1px solid blue")
    document.getElementById("container")?.appendChild(newImg);  
};  
  
// 设置图片源并启动加载过程  
img.src = imageUrl;
</script>

<style lang="less" scoped>
#container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin: 0 60px;
  }
}
</style>
