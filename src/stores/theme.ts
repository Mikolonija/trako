import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ThemeType } from "@/types/enums/theme";
import { defaultTheme, localStorageTheme, themeDataAttribute } from "@/config";

const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: useLocalStorage<ThemeType>(localStorageTheme, defaultTheme),
  }),
  actions: {
    changeTheme(newTheme: ThemeType): void {
      if (this.theme !== newTheme) {
        this.theme = newTheme;
        document.documentElement.setAttribute(themeDataAttribute, newTheme);
      }
    },
    applyTheme(): void {
      document.documentElement.setAttribute(themeDataAttribute, this.theme);
    },
  },
  getters: {
    getThemeStatus(): boolean {
      return this.theme === ThemeType.DM;
    },
  },
});

export { useThemeStore };
