import type { Habit } from '@/types/interfaces/habit';
import { setBodyOverflow } from '@/utils/helpers';
import { defineStore } from 'pinia';

const useModalStore = defineStore('modal', {
  state: () => ({
    show: false,
    component: null as unknown,
    habitModalSubmitAction: null as ((data: Habit) => void) | null,
    confirmModalSubmitAction: null as (() => void) | null,
    bodyText: '',
    notificationSuccessDescription: '',
    notificationSuccessTitle: '',
    btnSubmitText: '',
    title: '',
    description: '',
    habitId: '',
    isDeleteAction: false,
  }),

  actions: {
    showModal(): void {
      setBodyOverflow(true);
      this.show = true;
    },

    resetState(): void {
      this.show = false;
      this.habitModalSubmitAction = null;
      this.confirmModalSubmitAction = null;
      this.bodyText = '';
      this.notificationSuccessDescription = '';
      this.notificationSuccessTitle = '';
      this.btnSubmitText = '';
      this.title = '';
      this.description = '';
      this.habitId = '';
      this.isDeleteAction = false;
    },

    hideModal(): void {
      setBodyOverflow(false);
      this.resetState();
    },
  },
});

export { useModalStore };
