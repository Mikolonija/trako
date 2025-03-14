import { defineStore } from 'pinia';
import type { Habit, Time } from '@/types/interfaces/habit';
import { HabitActivationStatus, HabitStatus } from '@/types/enums/habit';
import { getCurrentTime } from '@/utils/helpers';
import { useLocalStorage } from '@vueuse/core';
import {
  defaultHabitRange,
  defaultLoadedMore,
  localStorageHabits,
  repeatDaysDefault,
  defaultYearsDuration,
  defaultHabitSelected,
} from '@/config';
import { addDays } from 'date-fns/addDays';
import { uuid } from 'vue-uuid';

const newHabit = (): Habit => {
  const { hours: startTimeHours, minutes } = getCurrentTime();
  const startTime: Time = {
    hours: startTimeHours === 23 ? 23 : startTimeHours + 1,
    minutes,
  };
  const startDate = new Date();
  return {
    id: '',
    itemId: '',
    name: '',
    repeatDays: repeatDaysDefault,
    isActive: HabitActivationStatus.Enable,
    deadline: new Date(),
    startDate: startDate,
    endDate: null,
    startTime,
    endTime: null,
    status: HabitStatus.Unfinished,
  };
};

const useHabitStore = defineStore('habit', {
  state: () => ({
    habits: useLocalStorage<Habit[]>(localStorageHabits, []),
    habit: newHabit(),
    dateRange: defaultHabitRange,
    loadedMore: defaultLoadedMore,
    habitSelected: defaultHabitSelected,
  }),

  actions: {
    changeHabitSelection(status: HabitActivationStatus): void {
      this.habitSelected = status;
    },

    setHabitDateFilter(newDateRange: Date[]): void {
      this.dateRange = newDateRange;
      this.loadedMore = defaultLoadedMore;
    },

    createHabit(newHabit: Habit): void {
      const habitInstances = this.createHabitItems(newHabit);
      this.habits.push(...habitInstances);
      this.habitSelected = HabitActivationStatus.Enable;
    },

    createHabitItems(habit: Habit): Habit[] {
      const habitItems: Habit[] = [];
      let currentDate = new Date(habit.startDate);
      const endDate = this.getEndDate(habit);
      const selectedRepeatDays = habit.repeatDays;
      while (currentDate.setHours(0, 0, 0, 0) <= endDate) {
        const dayOfWeek = currentDate.getDay();
        const isRepeatDay = selectedRepeatDays.some((day) => day.day === dayOfWeek);
        if (isRepeatDay) {
          habitItems.push(this.createHabitItem(habit, currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return habitItems;
    },

    createHabitItem(habit: Habit, currentDate: Date): Habit {
      return {
        ...habit,
        itemId: uuid.v1(),
        deadline: new Date(currentDate),
      };
    },

    changeHabitActivationStatus(currentHabit: Habit, status: HabitActivationStatus): void {
      this.habits = this.habits.map((habit) => {
        if (habit.id === currentHabit.id) {
          return { ...habit, isActive: status };
        }
        return habit;
      });
    },

    updateHabit(updatedHabit: Habit): void {
      const habitMap = new Map<string, Habit>();
      const existingDeadlines = this.habits.filter((x) => x.id === updatedHabit.id);
      existingDeadlines.forEach((habit) => {
        habitMap.set(habit.itemId, habit);
      });
      const existingDates = new Set(
        existingDeadlines.map((habit) => new Date(habit.deadline).setHours(0, 0, 0, 0)),
      );
      this.updateExistingHabits(habitMap, updatedHabit);
      this.createMissingHabits(existingDates, updatedHabit);
    },

    updateExistingHabits(habitMap: Map<string, Habit>, updatedHabit: Habit): void {
      const startDate = new Date(updatedHabit.startDate).setHours(0, 0, 0, 0);
      const endDate = this.getEndDate(updatedHabit);
      const updatedHabits: Habit[] = [];
      for (const [_, habit] of habitMap) {
        const habitDate = new Date(habit.deadline).setHours(0, 0, 0, 0);
        const isRepeatDay = updatedHabit.repeatDays.some(
          (day) => day.day === new Date(habit.deadline).getDay(),
        );
        if (habitDate >= startDate && habitDate <= endDate && isRepeatDay) {
          updatedHabits.push(this.updateHabitData(habit, updatedHabit));
        }
      }
      this.habits = this.habits
        .filter((habit) => !habitMap.has(habit.itemId))
        .concat(updatedHabits);
    },

    updateHabitData(habit: Habit, updatedHabit: Habit): Habit {
      return {
        ...habit,
        repeatDays: updatedHabit.repeatDays,
        name: updatedHabit.name,
        startDate: updatedHabit.startDate,
        endDate: updatedHabit.endDate,
        startTime: updatedHabit.startTime,
        endTime: updatedHabit.endTime,
      };
    },

    createMissingHabits(existingDates: Set<number>, updatedHabit: Habit): void {
      let currentDate = new Date(updatedHabit.startDate);
      const endDate = this.getEndDate(updatedHabit);
      const selectedRepeatDays = new Set(updatedHabit.repeatDays.map((day) => day.day));
      const newHabits: Habit[] = [];
      while (currentDate.setHours(0, 0, 0, 0) <= endDate) {
        const normalizedDate = new Date(currentDate).setHours(0, 0, 0, 0);
        const dayOfWeek = currentDate.getDay();
        if (!existingDates.has(normalizedDate) && selectedRepeatDays.has(dayOfWeek)) {
          newHabits.push(this.createNewHabit(updatedHabit, currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.habits = this.habits.concat(newHabits);
    },

    createNewHabit(updatedHabit: Habit, currentDate: Date): Habit {
      return {
        ...updatedHabit,
        itemId: uuid.v1(),
        deadline: new Date(currentDate),
        status: HabitStatus.Unfinished,
      };
    },

    getEndDate(habit: Habit): number {
      let endDate: Date;
      if (habit.endDate === null) {
        endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + defaultYearsDuration);
      } else {
        endDate = new Date(habit.endDate);
      }
      return endDate.setHours(0, 0, 0, 0);
    },

    changeHabitStatus(currentHabit: Habit, status: HabitStatus): void {
      const index = this.habits.findIndex((habit) => habit.itemId === currentHabit.itemId);
      if (index !== -1) {
        this.habits[index].status = status;
      }
    },

    deleteHabit(currentHabit: Habit): void {
      this.habits = this.habits.filter((habit) => habit.id !== currentHabit.id);
    },

    resetHabitState(): void {
      this.habit = newHabit();
      this.dateRange = defaultHabitRange;
      this.loadedMore = defaultLoadedMore;
      this.habitSelected = HabitActivationStatus.Enable;
    },
  },

  getters: {
    markDays: (state): { date: Date; type: string; color: string }[] => {
      return state.habits
        .filter((x) => x.isActive === state.habitSelected)
        .map((x: Habit) => ({
          date: addDays(new Date(x.deadline), 0),
          type: 'dot',
          color: '#8B0000',
        }));
    },

    isHabitActive: (state): boolean => {
      return state.habitSelected === HabitActivationStatus.Enable;
    },

    formattedHabitFilterDates: (state): string => {
      return state.dateRange
        .map((date) => {
          const d = new Date(date);
          return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(
            2,
            '0',
          )}/${String(d.getDate()).padStart(2, '0')}`;
        })
        .join(' - ');
    },
  },
});

export { useHabitStore };
