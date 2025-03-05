<template>
  <div class="form">
    <div class="form-container-space">
      <label class="form-habit-name-text" for="habit-name">
        <span class="font-montserrat-14-regular"> {{ t('habitForm.labels.habitName') }}* </span>
        <span class="font-montserrat-14-regular">
          {{ cleanSpaces(habitFormState.name, SpaceCleanOption.RemoveAll).length }} /
          {{ habitFormStore.nameMaxLength }}
        </span>
      </label>
      <textarea
        data-testid="cy-habit-name"
        @input="handleNameMaxLength()"
        ref="habitNameTextarea"
        :class="{ 'invalid-textarea': habitFormStore.timerErrorStyleState.name }"
        class="form-name-textarea font-montserrat-14-regular"
        id="habit-name"
        v-model="habitFormState.name"
        :placeholder="t('habitForm.placeholders.habitName')"
      ></textarea>
    </div>
    <div class="form-container-space form-habit-container">
      <div class="form-container-space">
        <label class="font-montserrat-14-regular" for="start-date">{{
          t('habitForm.labels.startDate')
        }}</label>
        <VueDatePicker
          prevent-min-max-navigation
          :year-range="[minHabitDate.getFullYear(), maxHabitDate.getFullYear()]"
          :class="{ 'invalid-input': habitFormStore.timerErrorStyleState.startDate }"
          aria-labelledby="start-date"
          :min-date="minHabitDate"
          :max-date="habitFormState.endDate === null ? maxHabitDate : habitFormState.endDate"
          :locale="locale.toLowerCase()"
          :enable-time-picker="false"
          v-model="habitFormState.startDate"
          :cancel-text="t('calendar.btn.close')"
          :select-text="t('calendar.btn.pick')"
          :dark="themeStore.getThemeStatus"
          placeholder="Select Date"
        >
          <template #clear-icon />
        </VueDatePicker>
      </div>
      <div class="form-container-space">
        <div class="form-habit-checkbox-container">
          <label class="font-montserrat-14-regular" for="end-date">{{
            t('habitForm.labels.endDate')
          }}</label>
          <div class="layout-center">
            <input
              type="checkbox"
              id="end-date"
              class="checkbox"
              v-model="isEndDate"
              data-testid="cy-habit-end-date"
            />
          </div>
        </div>
        <VueDatePicker
          prevent-min-max-navigation
          :year-range="[minHabitDate.getFullYear(), maxHabitDate.getFullYear()]"
          :disabled="habitFormState.endDate === null"
          :class="{ 'invalid-input': habitFormStore.timerErrorStyleState.endDate }"
          aria-labelledby="end-date"
          :max-date="maxHabitDate"
          :min-date="habitFormState.startDate"
          :locale="locale.toLowerCase()"
          :enable-time-picker="false"
          v-model="habitFormState.endDate"
          :cancel-text="t('calendar.btn.close')"
          :select-text="t('calendar.btn.pick')"
          :dark="themeStore.getThemeStatus"
        >
          <template #clear-icon />
        </VueDatePicker>
      </div>
    </div>
    <div>
      <p class="font-montserrat-14-regular">{{ repeatText }}</p>
      <div class="day-list-container">
        <p
          class="day-list-container-card font-montserrat-14-regular"
          v-for="day in repeatDaysDefault"
          :key="day.msg"
          :class="{
            'active-day': isActiveDay(day.id),
            'last-active-day': isLastActiveDay(day.id),
          }"
          @click="toggleDay(day)"
        >
          {{ t(day.msg) }}
        </p>
      </div>
    </div>
    <div class="form-container-space form-habit-container">
      <div class="form-container-space">
        <label class="font-montserrat-14-regular" for="start-time">{{
          t('habitForm.labels.startTime')
        }}</label>
        <VueDatePicker
          :class="{ 'invalid-input': habitFormStore.timerErrorStyleState.timer }"
          aria-labelledby="start-time"
          :cancel-text="t('calendar.btn.close')"
          :select-text="t('calendar.btn.pick')"
          :locale="locale.toLowerCase()"
          v-model="habitFormState.startTime"
          time-picker
          :dark="themeStore.getThemeStatus"
        >
          <template #clear-icon />
        </VueDatePicker>
      </div>
      <div class="form-container-space">
        <div class="form-habit-checkbox-container">
          <label class="font-montserrat-14-regular" for="end-time">{{
            t('habitForm.labels.endTime')
          }}</label>
          <div class="layout-center">
            <input
              type="checkbox"
              id="end-time"
              class="checkbox"
              v-model="isEndTime"
              data-testid="cy-habit-end-time"
            />
          </div>
        </div>
        <VueDatePicker
          :disabled="habitFormState.endTime === null"
          :class="{ 'invalid-input': habitFormStore.timerErrorStyleState.timer }"
          aria-labelledby="end-time"
          :cancel-text="t('calendar.btn.close')"
          :select-text="t('calendar.btn.pick')"
          :locale="locale.toLowerCase()"
          v-model="habitFormState.endTime"
          time-picker
          :dark="themeStore.getThemeStatus"
        >
          <template #clear-icon />
        </VueDatePicker>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { useI18n } from 'vue-i18n';
import { cleanSpaces } from '@/utils/helpers';
import { computed, onMounted, ref, watch } from 'vue';
import { SpaceCleanOption } from '@/types/enums/habit';
import { useHabitFormStore } from '@/stores/habitForm';
import { defaultYearsDuration, repeatDaysDefault } from '@/config';
import type { RepeatDay, Time } from '@/types/interfaces/habit';

const { locale, t } = useI18n();
const themeStore = useThemeStore();
const habitFormStore = useHabitFormStore();
const habitFormState = habitFormStore.habitForm;
const repeatDays = ref<RepeatDay[]>([...habitFormState.repeatDays]);
const habitNameTextarea = ref<HTMLTextAreaElement>();
const isEndTime = ref<boolean>(habitFormState.endTime !== null);
const oldEndDate = ref<Date | null>(habitFormState.endDate);
const isEndDate = ref<boolean>(habitFormState.endDate !== null);
const oldEndTime = ref<Time | null>(habitFormState.endTime);

const maxHabitDate = new Date(
  new Date().setFullYear(new Date().getFullYear() + defaultYearsDuration),
);

const minHabitDate = new Date(new Date().getFullYear(), 0, 1);

const isActiveDay = (id: number): boolean => {
  return repeatDays.value.some((d) => d.id === id) && repeatDays.value.length !== 1;
};

const isLastActiveDay = (id: number): boolean => {
  return repeatDays.value.some((d) => d.id === id) && repeatDays.value.length === 1;
};

const handleNameMaxLength = (): void => {
  if (!habitNameTextarea.value) return;
  let textWithoutSpaces: number = cleanSpaces(
    habitFormState.name,
    SpaceCleanOption.RemoveAll,
  ).length;
  if (textWithoutSpaces >= habitFormStore.nameMaxLength)
    habitNameTextarea.value.maxLength = habitFormState.name.length;
  else habitNameTextarea.value.removeAttribute('maxLength');
};

const toggleDay = (day: RepeatDay): void => {
  const index: number = repeatDays.value.findIndex((d) => d.id === day.id);
  if (index !== -1 && repeatDays.value.length === 1) return;
  if (index === -1) repeatDays.value.push(day);
  else repeatDays.value.splice(index, 1);
  habitFormState.repeatDays = [...repeatDays.value];
};

const repeatText = computed(() => {
  if (repeatDays.value.length === repeatDaysDefault.length) {
    return t('habitForm.labels.repeat.every');
  } else {
    const sortedDays = [...repeatDays.value].sort((a, b) => a.id - b.id);
    const dayLabels = sortedDays.map((day) => t(day.msg));
    return t('habitForm.labels.repeat.onDays', {
      days: dayLabels.join(', '),
    });
  }
});

watch(
  () => habitFormState.name,
  () => {
    habitFormStore.checkNameError();
  },
);

watch(
  () => habitFormState.startDate,
  () => {
    habitFormStore.checkDateError();
  },
);

watch(
  () => habitFormState.endDate,
  () => {
    habitFormStore.checkDateError();
  },
);

watch(
  () => habitFormState.startTime,
  () => {
    habitFormStore.checkTimeError();
  },
);

watch(
  () => habitFormState.endTime,
  () => {
    habitFormStore.checkTimeError();
  },
);

watch(isEndTime, (newValue: boolean) => {
  if (newValue) {
    if (oldEndTime.value !== null) habitFormState.endTime = oldEndTime.value;
    else {
      const startTime: Time = {
        hours: habitFormState.startTime.hours === 23 ? 23 : habitFormState.startTime.hours + 1,
        minutes: habitFormState.startTime.minutes,
      };
      const endTime: Time = {
        hours: startTime.hours % 24,
        minutes: habitFormState.startTime.minutes,
      };
      habitFormState.endTime = endTime;
    }
  } else habitFormState.endTime = null;
});

watch(isEndDate, (newValue: boolean) => {
  if (newValue) {
    if (oldEndDate.value !== null) habitFormState.endDate = oldEndDate.value;
    else {
      const newEndDate: Date = new Date(new Date().setDate(new Date().getDate() + 7));
      habitFormState.endDate = newEndDate;
    }
  } else habitFormState.endDate = null;
});

onMounted(() => {
  habitFormStore.checkAllError();
  habitNameTextarea.value?.focus();
});
</script>

<style setup lang="scss">
@use '@/styles/dataPicker' as *;

.form {
  display: grid;
  gap: $spacing-medium;

  &-container-space {
    gap: $spacing-small;
    display: grid;
  }

  &-habit-checkbox-container {
    display: grid;
    grid-template-columns: 1fr auto;

    label {
      cursor: pointer;
    }
  }

  &-habit-name-text {
    display: grid;
    grid-template-columns: 1fr auto;
  }

  &-name-textarea {
    width: 100%;
    min-height: 100px;
    border: solid 1px var(--textarea-border-color);
    background-color: var(--modal-textarea-bg);
    color: var(--modal-textarea-color);
    border-radius: $radius-small;
    padding: 12px;
    outline: none;
    transition: border 0.2s;
  }

  &-name-textarea::placeholder {
    @include font-montserrat(0.875rem, 400);
  }

  &-name-textarea:focus,
  &-name-textarea:hover {
    border: solid 1px var(--textarea-focus-border-color);
  }

  &-habit-container {
    grid-template-columns: 1fr 1fr;

    @include media-query(phone) {
      gap: $spacing-medium;
      grid-template-columns: 1fr;
    }
  }
}

.day-list-container {
  display: flex;
  margin: $spacing-small 0 0 0;
  border: solid 1px var(--repeat-day-border);
  border-radius: $radius-small;
  color: var(--color);
  background-color: var(--repeat-day-default-bg);

  &-card {
    cursor: pointer;
    width: 100%;
    text-align: center;
    padding: $spacing-small;
    border-right: solid 1px var(--repeat-day-border);
  }

  &-card:hover {
    opacity: 0.5;
  }

  &-card:last-child {
    border-right: solid 0 transparent;
  }
}

.invalid-textarea {
  border: solid 1px var(--error-color) !important;
  color: var(--error-color) !important;
}

.invalid-input input {
  border: solid 1px var(--error-color) !important;
  color: var(--error-color) !important;
}

.last-active-day {
  cursor: not-allowed;
  background: var(--repeat-day-bg);
  color: var(--repeat-day-color);
}

.active-day {
  background: var(--repeat-day-bg);
  color: var(--repeat-day-color);
}
</style>
