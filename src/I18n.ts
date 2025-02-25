import { createI18n } from 'vue-i18n';
import EN from '@/locales/en.json';
import LT from '@/locales/lt.json';
import { useLocalStorage } from '@vueuse/core';
import { localStorageLanguage } from '@/config';
import { LanguageType } from '@/types/enums/language';

const language = useLocalStorage(localStorageLanguage, LanguageType.EN);

export const i18n = createI18n({
  legacy: false,
  locale: language.value,
  messages: {
    LT,
    EN,
  },
});
