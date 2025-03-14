import { addDays } from 'date-fns/addDays';
import { HabitActivationStatus } from './types/enums/habit';
import { LanguageType } from './types/enums/language';
import { ThemeType } from './types/enums/theme';
import type { RepeatDay } from './types/interfaces/habit';

const localStorageLanguage: string = 'language';
const localStorageTheme: string = 'theme';
const localStorageHabits: string = 'habits';
const themeDataAttribute: string = 'data-theme';
const defaultHabitRange: Date[] = [new Date(), addDays(new Date(), 0)];
const defaultLoadedMore: number = 8;
const defaultYearsDuration: number = 2;
const defaultHabitSelected: HabitActivationStatus = HabitActivationStatus.Enable;
const defaultLanguage: LanguageType = LanguageType.EN;
const defaultTheme: ThemeType = ThemeType.LM;
const defaultMaxNameLength: number = 255;
const cyTestWebsiteLink: string = 'https://trako.vercel.app';

const repeatDaysDefault: RepeatDay[] = [
  { msg: 'calendar.days.mo', day: 1, id: 0 },
  { msg: 'calendar.days.tu', day: 2, id: 1 },
  { msg: 'calendar.days.we', day: 3, id: 2 },
  { msg: 'calendar.days.th', day: 4, id: 3 },
  { msg: 'calendar.days.fr', day: 5, id: 4 },
  { msg: 'calendar.days.sa', day: 6, id: 5 },
  { msg: 'calendar.days.su', day: 0, id: 6 },
];

const responsiveSize = {
  breakPointPhone: 480,
  breakPointTablet: 768,
};

const routerPath = {
  home: { name: 'home', path: '/' },
  homeByDate: { name: 'homeByDate', path: '/day/:date' },
  homeByDateRange: { name: 'homeByDateRange', path: '/day/:startDate/:endDate' },
  help: { name: 'help', path: '/help' },
  notFound: { name: 'notFound', path: '/:catchAll(.*)' },
};

export {
  localStorageLanguage,
  localStorageTheme,
  localStorageHabits,
  themeDataAttribute,
  defaultLoadedMore,
  responsiveSize,
  cyTestWebsiteLink,
  repeatDaysDefault,
  defaultYearsDuration,
  defaultHabitRange,
  routerPath,
  defaultLanguage,
  defaultTheme,
  defaultHabitSelected,
  defaultMaxNameLength,
};
