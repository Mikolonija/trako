<template>
  <div v-for="(bubble, index) in bubbles" :key="index" class="bubble">
    {{ bubble }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const bubbles = ref(['', '', '', '', '', '', '', '', '']);
</script>

<style scoped lang="scss">
.bubble {
  position: absolute;
  top: 80vh;
  left: 45vw;
  width: 10px;
  height: 10px;
  background-color: var(--bubble-color);
  border-radius: 50%;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: bubble 8s ease-in forwards infinite;

  &:nth-child(2) {
    animation-delay: 1;
    left: 25vw;
    top: 40vh;
  }

  &:nth-child(3) {
    animation-delay: 4;
    left: 75vw;
    top: 50vh;
  }

  &:nth-child(4) {
    animation-delay: 3;
    left: 10vw;
    top: 10vh;
  }

  &:nth-child(5) {
    animation-delay: 5s;
    left: 10vw;
    top: 85vh;
  }

  &:nth-child(6) {
    animation-delay: 7s;
    left: 50vw;
    top: 10vh;
  }

  &:nth-child(7) {
    animation-delay: 9s;
    left: 50vw;
    top: 55vh;
  }

  &:nth-child(8) {
    animation-delay: 11s;
    left: 15vw;
    top: 50vh;
  }

  &:nth-child(9) {
    animation-delay: 13s;
    left: 70vw;
    top: 80vh;
  }
}

@keyframes bubble {
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }

  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
