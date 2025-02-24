import { addDays } from "date-fns/addDays";
import { HabitActivationStatus } from "./types/enums/habit";
import { LanguageType } from "./types/enums/language";
import { ThemeType } from "./types/enums/theme";

const localStorageLanguage = "language";
const localStorageTheme = "theme";
const localStorageHabits = "habits";
const themeDataAttribute = "data-theme";
const defaultHabitRange = [new Date(), addDays(new Date(), 0)];
const defaultLoadedMore = 8;
const defaultYearsDuration = 2;
const defaultHabitSelected = HabitActivationStatus.Enable;
const defaultLanguage = LanguageType.EN;
const defaultTheme = ThemeType.LM;
const defaultMaxNameLength = 255;

const repeatDaysDefault = [
  { msg: "calendar.days.mo", day: 1, id: 0 },
  { msg: "calendar.days.tu", day: 2, id: 1 },
  { msg: "calendar.days.we", day: 3, id: 2 },
  { msg: "calendar.days.th", day: 4, id: 3 },
  { msg: "calendar.days.fr", day: 5, id: 4 },
  { msg: "calendar.days.sa", day: 6, id: 5 },
  { msg: "calendar.days.su", day: 0, id: 6 },
];

const responsiveSize = {
  breakPointPhone: 480,
  breakPointTablet: 768,
};

const routerPath = {
  home: { name: "home", path: "/" },
  homeByDate: { name: "homeByDate", path: "/day/:date" },
  homeByDateRange: { name: "homeByDateRange", path: "/day/:startDate/:endDate" },
  help: { name: "help", path: "/help" },
  notFound: { name: "notFound", path: "/:catchAll(.*)" },
};

export {
  localStorageLanguage,
  localStorageTheme,
  localStorageHabits,
  themeDataAttribute,
  defaultLoadedMore,
  responsiveSize,
  repeatDaysDefault,
  defaultYearsDuration,
  defaultHabitRange,
  routerPath,
  defaultLanguage,
  defaultTheme,
  defaultHabitSelected,
  defaultMaxNameLength,
};
