import { defineStore } from 'pinia';
import { cleanSpaces } from '@/utils/helpers';
import type { Habit, HabitErrorMessage, Time } from '@/types/interfaces/habit';
import { HabitErrorID, SpaceCleanOption } from '@/types/enums/habit';
import { defaultMaxNameLength } from '@/config';

const useHabitFormStore = defineStore('habitForm', {
  state: () => ({
    habitForm: {} as Habit,
    habitFormPreview: {} as Habit,
    errorMessage: [] as HabitErrorMessage[],
    timerErrorStyleState: {
      timer: false as boolean,
      startDate: false as boolean,
      endDate: false as boolean,
      name: false as boolean,
    },
    nameMaxLength: defaultMaxNameLength as number,
  }),

  actions: {
    setHabitForm(habit: Habit): void {
      this.habitForm = { ...habit };
      this.habitFormPreview = { ...habit };
    },

    isNowDate(currentDate: Date, deadlineDate: Date): boolean {
      return currentDate.toDateString() === deadlineDate.toDateString();
    },

    isChanged(): boolean {
      return (
        this.habitForm.startDate !== this.habitFormPreview.startDate ||
        this.habitForm.endDate !== this.habitFormPreview.endDate ||
        this.habitForm.startTime !== this.habitFormPreview.startTime ||
        this.habitForm.repeatDays !== this.habitFormPreview.repeatDays ||
        this.habitForm.endTime !== this.habitFormPreview.endTime ||
        this.habitForm.name.trim() !== this.habitFormPreview.name.trim()
      );
    },

    resetNameErrors(): void {
      this.errorMessage = this.errorMessage.filter(
        (error) => error.id !== HabitErrorID.NameLength && error.id !== HabitErrorID.NameEmpty,
      );
      this.timerErrorStyleState.name = false;
    },

    resetDateError(): void {
      this.errorMessage = this.errorMessage.filter(
        (error) =>
          error.id !== HabitErrorID.StartDateInvalid && error.id !== HabitErrorID.EndDateInvalid,
      );
      this.timerErrorStyleState.startDate = false;
      this.timerErrorStyleState.endDate = false;
    },

    checkNameError(): void {
      const { name } = this.habitForm;
      this.resetNameErrors();
      this.validateName(name);
      this.validateTextLength(name);
    },

    resetTimeError(): void {
      this.errorMessage = this.errorMessage.filter(
        (error) => error.id !== HabitErrorID.TimeInvalid,
      );
      this.timerErrorStyleState.timer = false;
    },

    checkTimeError(): void {
      const { startTime, endTime } = this.habitForm;
      this.resetTimeError();
      if (endTime !== null) {
        this.validateStartAndEndTime(startTime, endTime);
      }
    },

    checkDateError(): void {
      const { startDate, endDate } = this.habitForm;
      const currentStartDate = new Date(startDate);
      this.resetDateError();
      this.validateStartDate(currentStartDate);
      if (endDate !== null) {
        const currentEndDate = new Date(endDate);
        this.validateEndDate(currentEndDate);
      }
    },

    checkAllError(): void {
      this.checkNameError();
      this.resetDateError();
      this.resetTimeError();
    },

    resetAllErrors(): void {
      this.errorMessage = [] as HabitErrorMessage[];
      this.timerErrorStyleState.timer = false;
      this.timerErrorStyleState.startDate = false;
      this.timerErrorStyleState.endDate = false;
      this.timerErrorStyleState.name = false;
    },

    validateTextLength(name: string): void {
      let textWithoutSpaces = cleanSpaces(name, SpaceCleanOption.RemoveAll).length;
      if (textWithoutSpaces > this.nameMaxLength) {
        this.errorMessage.push({
          msg: 'habitForm.errors.habitNameLength',
          id: HabitErrorID.NameLength,
        });
        this.timerErrorStyleState.name = true;
      }
    },

    validateName(name: string): void {
      if (!name.trim()) {
        this.errorMessage.push({
          msg: 'habitForm.errors.habitNameEmpty',
          id: HabitErrorID.NameEmpty,
        });
      }
    },

    validateStartAndEndTime(startTime: Time, endTime: Time): void {
      if (
        endTime.hours < startTime.hours ||
        (endTime.hours === startTime.hours && endTime.minutes <= startTime.minutes)
      ) {
        this.errorMessage.push({
          msg: 'habitForm.errors.startTimeBeforeEndTime',
          id: HabitErrorID.TimeInvalid,
        });
        this.timerErrorStyleState.timer = true;
      }
    },

    validateEndDate(startDate: Date): void {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (startDate < yesterday) {
        this.errorMessage.push({
          msg: 'habitForm.errors.endDateCurrentError',
          id: HabitErrorID.EndDateInvalid,
        });
        this.timerErrorStyleState.endDate = true;
      }
    },

    validateStartDate(startDate: Date): void {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (startDate < yesterday) {
        this.errorMessage.push({
          msg: 'habitForm.errors.startDateCurrentError',
          id: HabitErrorID.StartDateInvalid,
        });
        this.timerErrorStyleState.startDate = true;
      }
    },

    clearHabitFormState(): void {
      this.setHabitForm({} as Habit);
      this.resetAllErrors();
    },
  },

  getters: {
    isHabitFormValid: (state): boolean => {
      return state.errorMessage.length === 0;
    },

    listOutNameEmptyErrors: (state): HabitErrorMessage[] => {
      return state.errorMessage.filter((x) => x.id !== HabitErrorID.NameEmpty);
    },
  },
});

export { useHabitFormStore };
