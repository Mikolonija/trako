<template>
  <div class="home-layout">
    <div class="habits">
      <HabitCreateCard />
      <HabitList />
    </div>
    <div class="habits-filter">
      <HabitFilter />
    </div>
  </div>
</template>

<script setup lang="ts">
import HabitFilter from '@/components/habit/HabitFilter.vue';
import HabitCreateCard from '@/components/habit/HabitCreateCard.vue';
import HabitList from '@/components/habit/HabitList.vue';
</script>

<style scoped lang="scss">
.home-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  height: 100%;
  width: 100%;
  max-width: $breakpoint-large-device;
  margin: 0 auto;

  @include media-query(tablet) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 76px;
  }
}

.habits {
  padding: $spacing-large;
  overflow-y: auto;

  @include media-query(tablet) {
    padding: $spacing-large $spacing-medium;
  }
}

.habits-filter {
  position: relative;
}
</style>
