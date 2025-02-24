import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { defaultLanguage, localStorageLanguage } from "@/config";
import { LanguageType } from "@/types/enums/language";

const useLanguageStore = defineStore("language", {
  state: () => ({
    language: useLocalStorage<LanguageType>(localStorageLanguage, defaultLanguage),
  }),

  actions: {
    changeLanguage(newLanguage: LanguageType): void {
      if (this.language !== newLanguage) {
        this.language = newLanguage;
      }
    },
  },
});

export { useLanguageStore };
