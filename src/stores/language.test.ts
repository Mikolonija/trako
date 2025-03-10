import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useLanguageStore } from '@/stores/language';
import { defaultLanguage } from '@/config';
import { LanguageType } from '@/types/enums/language';

describe('Language settings', () => {
  let languageStore: ReturnType<typeof useLanguageStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    languageStore = useLanguageStore();
    languageStore.language = defaultLanguage;
  });

  it('Check does default language ', () => {
    expect(languageStore.language).toBe(defaultLanguage);
  });

  it('Change the language to Lithuania language', () => {
    languageStore.changeLanguage(LanguageType.LT);
    expect(languageStore.language).toBe(LanguageType.LT);
  });
});
