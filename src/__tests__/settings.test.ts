import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useThemeStore } from '@/stores/theme';
import { useLanguageStore } from '@/stores/language';
import { defaultLanguage, defaultTheme } from '@/config';
import { ThemeType } from '@/types/enums/theme';
import { LanguageType } from '@/types/enums/language';

describe('Theme settings', () => {
  let themeStore: ReturnType<typeof useThemeStore>;
  const mockSetAttribute = vi.fn();

  beforeEach(() => {
    setActivePinia(createPinia());
    themeStore = useThemeStore();
    global.document = {
      documentElement: {
        setAttribute: mockSetAttribute,
      },
    } as unknown as Document;
    themeStore.theme = defaultTheme;
  });

  it('Check does default theme', () => {
    expect(themeStore.theme).toBe(defaultTheme);
  });

  it('Change the theme to Dark Mode', () => {
    themeStore.changeTheme(ThemeType.DM);
    expect(themeStore.theme).toBe(ThemeType.DM);
  });
});

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
