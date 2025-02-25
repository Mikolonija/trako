import type { HabitActivationStatus, HabitStatus } from '@/types/enums/habit';

export interface Habit {
  id: string;
  itemId: string;
  repeatDays: RepeatDay[];
  isActive: HabitActivationStatus;
  name: string;
  deadline: Date;
  startDate: Date;
  endDate: Date | null;
  startTime: Time;
  endTime: Time | null;
  status: HabitStatus;
}

export interface Time {
  hours: number;
  minutes: number;
}

export interface RepeatDay {
  id: number;
  day: number;
  msg: string;
}

export interface HabitErrorMessage {
  id: number;
  msg: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface HabitStatusInfo {
  class: string;
  msg: string;
}
