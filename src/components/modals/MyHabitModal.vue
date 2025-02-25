<template>
  <div class="modal-bg" @keyup.esc="hideModal()" tabindex="-1">
    <div class="modal" ref="modal">
      <button
        type="button"
        :aria-label="t('buttonsLabels.closeModal')"
        @click="hideModal()"
        class="modal-close-container"
      >
        <SvgImage
          :alt="t('imagesAlt.closeImg')"
          name="close"
          folder="globals"
          width="18"
          height="18"
          class="modal-close-icon"
        />
      </button>
      <div class="modal-header">
        <h1 class="font-montserrat-28-bold">{{ modalStore.title }}</h1>
        <p class="modal-header-description font-montserrat-16-regular">
          {{ modalStore.description }}
        </p>
      </div>
      <div class="modal-main-with-scroll">
        <template v-if="modalStore.habitId">
          <div class="habit-time-container">
            <div class="layout-left-center">
              <p class="font-montserrat-14-bold" v-if="habitTimeRange">
                {{ `${completedCount}/${filteredHabits.length}` }}
              </p>
            </div>
            <div class="layout-right-center">
              <p class="font-montserrat-14-bold">
                {{ habitTimeRange }}
              </p>
            </div>
          </div>
          <div class="habit-name-container">
            <p class="font-montserrat-14-regular">{{ filteredHabits[0].name }}</p>
          </div>
          <ul class="card habit-deadline-list" v-for="(habit, i) in visibleHabits" :key="i">
            <li class="font-montserrat-14-regular layout-left-center">
              <p>{{ formattedDeadlineDate(habit) }}</p>
            </li>
            <li class="layout-right-center">
              <p class="status font-montserrat-12-bold" :class="habitStatusClass(habit)">
                {{ habitStatusMsg(habit) }}
              </p>
            </li>
          </ul>
          <button
            type="button"
            :aria-label="t('buttonsLabels.loadMore')"
            v-if="visibleHabits.length < filteredHabits.length"
            @click="loadMore"
            class="loaded-more-btn font-montserrat-14-bold"
          >
            {{ t('progress.loadMore') }}
          </button>
        </template>
      </div>
      <div class="modal-footer layout-right-center">
        <button
          type="button"
          :aria-label="t('buttonsLabels.closeModal')"
          class="modal-btn-confirm font-montserrat-14-bold"
          @click="hideModal()"
        >
          {{ t('modal.buttons.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useModalStore } from '@/stores/modal';
import { onClickOutside } from '@vueuse/core';
import SvgImage from '@/components/SvgImage.vue';
import { formatTime, getStatus, formatDate } from '@/utils/helpers';
import { HabitStatus } from '@/types/enums/habit';
import { defaultLoadedMore } from '@/config';
import type { Habit, HabitStatusInfo } from '@/types/interfaces/habit';
import { useHabitStore } from '@/stores/habit';

const { t } = useI18n();
const modalStore = useModalStore();
const habitStore = useHabitStore();
const modal = ref(null);
const itemsToShow = ref<number>(defaultLoadedMore);

const loadMore = (): void => {
  itemsToShow.value += defaultLoadedMore;
};

const hideModal = (): void => {
  modalStore.hideModal();
};

const visibleHabits = computed(() => {
  return filteredHabits.value.slice(0, itemsToShow.value);
});

const completedCount = computed(() => {
  return filteredHabits.value?.filter((x) => x.status === HabitStatus.Complete).length || 0;
});

const filteredHabits = computed(() => {
  return (
    habitStore.habits
      .filter((habit: Habit) => habit.id === modalStore.habitId)
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()) || []
  );
});

const habitTimeRange = computed(() => {
  const firstHabit: Habit = filteredHabits.value[0];
  const start: string = firstHabit.startTime ? formatTime(firstHabit.startTime) : 'N/A';
  const end: string = firstHabit.endTime ? formatTime(firstHabit.endTime) : 'N/A';
  return `${start} - ${end}`;
});

const habitStatus = computed(() => {
  return (habit: Habit) => {
    const status: HabitStatusInfo = getStatus(habit);
    return status;
  };
});

const habitStatusMsg = computed(() => {
  return (habit: Habit) => {
    const status: HabitStatusInfo = habitStatus.value(habit);
    return t(status.msg);
  };
});

const habitStatusClass = computed(() => {
  return (habit: Habit) => {
    const status: HabitStatusInfo = habitStatus.value(habit);
    return status.class;
  };
});

const formattedDeadlineDate = computed(() => {
  return (habit: Habit) => {
    return formatDate(habit.deadline);
  };
});

onClickOutside(modal, () => {
  hideModal();
});
</script>

<style setup lang="scss">
@use '@/styles/modal' as *;

.habit-time-container {
  display: grid;
  grid-template-columns: 1fr auto;
}

.card {
  background-color: var(--card-bg);
  color: var(--color);
  box-shadow: var(--card-shadow-color) 0px 1px 4px;
  padding: $spacing-small;
  border-radius: $radius-small;
}

.habit-deadline-list {
  display: grid;
  gap: $spacing-small;
  grid-template-columns: 1fr auto;
  margin-bottom: $spacing-small;
}

.habit-name-container {
  padding: $spacing-large 0 $spacing-large 0;
}
</style>
