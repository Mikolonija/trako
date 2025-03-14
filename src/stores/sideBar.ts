import { setBodyOverflow } from '@/utils/helpers';
import { defineStore } from 'pinia';
import { responsiveSize } from '@/config';

const isMobile = () => window.innerWidth <= responsiveSize.breakPointPhone;
const isTablet = () => window.innerWidth <= responsiveSize.breakPointTablet;

const useSideBarStore = defineStore('sideBar', {
  state: () => ({
    isMenuSideBarCollapsed: false,
    isMenuSideBarOpen: false,
    isHabitNavigationSideBarCollapsed: false,
  }),

  actions: {
    openMenuSideBar(): void {
      setBodyOverflow(true);
      this.isMenuSideBarCollapsed = true;
      this.isMenuSideBarOpen = true;
    },

    closeMenuSideBar(): void {
      if (this.isMenuSideBarCollapsed) {
        setBodyOverflow(false);
        this.isMenuSideBarCollapsed = isMobile();
        this.isMenuSideBarOpen = false;
      }
    },

    closeHabitNavigationSideBar(): void {
      if (isTablet()) {
        this.isHabitNavigationSideBarCollapsed = false;
      }
    },

    resizeHabitNavigationSideBar(): void {
      this.isHabitNavigationSideBarCollapsed = !this.isHabitNavigationSideBarCollapsed;
    },

    resizeMenuSideBar(): void {
      this.isMenuSideBarCollapsed = !this.isMenuSideBarCollapsed;
      this.isMenuSideBarOpen = !this.isMenuSideBarCollapsed;
      setBodyOverflow(this.isMenuSideBarCollapsed);
    },
  },
});

export { useSideBarStore };
