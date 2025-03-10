import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { HabitActivationStatus, HabitStatus } from '@/types/enums/habit';
import { useHabitStore } from '@/stores/habit';
import type { Habit } from '@/types/interfaces/habit';
import { repeatDaysDefault } from '@/config';

describe('Habit Store - CRUD Operations', () => {
  let habitStore: ReturnType<typeof useHabitStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    habitStore = useHabitStore();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const newHabit: Habit = {
    id: 'testHabit',
    itemId: 'item1',
    name: 'Morning Run',
    repeatDays: repeatDaysDefault,
    isActive: HabitActivationStatus.Enable,
    deadline: today,
    startDate: today,
    endDate: today,
    startTime: { hours: 7, minutes: 0 },
    endTime: { hours: 8, minutes: 0 },
    status: HabitStatus.Unfinished,
  };

  it('Create a new habit', () => {
    habitStore.createHabit(newHabit);
    expect(habitStore.habits[0].id).toBe('testHabit');
  });

  it('Read habit', () => {
    habitStore.createHabit(newHabit);
    const foundHabit = habitStore.habits.find((h) => h.id === 'testHabit');
    expect(foundHabit).toBeDefined();
    expect(foundHabit?.name).toBe('Morning Run');
  });

  it('Update habit', () => {
    habitStore.createHabit(newHabit);
    const updatedHabit: Habit = { ...newHabit, name: 'Daily Meditation' };
    habitStore.updateHabit(updatedHabit);
    const foundHabit = habitStore.habits.find((h) => h.id === 'testHabit');
    expect(foundHabit).toBeDefined();
    expect(foundHabit?.name).toBe('Daily Meditation');
  });

  it('Delete habit', () => {
    habitStore.createHabit(newHabit);
    expect(habitStore.habits.length).toBe(1);
    habitStore.deleteHabit(newHabit);
    expect(habitStore.habits.length).toBe(0);
  });
});
