import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useThemeStore } from '@/stores/theme';
import { defaultTheme } from '@/config';
import { ThemeType } from '@/types/enums/theme';

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
