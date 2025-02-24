import { HabitActivationStatus, HabitStatus } from "@/types/enums/habit";
import { SpaceCleanOption } from "@/types/enums/habit";
import type { Habit, HabitStatusInfo, Time } from "@/types/interfaces/habit";

const setBodyOverflow = (hidden: boolean): void => {
  document.body.style.overflow = hidden ? "hidden" : "auto";
};

const cleanSpaces = (name: string, option: SpaceCleanOption): string => {
  switch (option) {
    case SpaceCleanOption.TrimAndReplace:
      return name.trim().replace(/\s+/g, " ");
    case SpaceCleanOption.RemoveAll:
      return name.replace(/\s+/g, "");
    default:
      return name;
  }
};

const getStatus = (habit: Habit): HabitStatusInfo => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const deadline = new Date(habit.deadline);
  if (
    habit.isActive === HabitActivationStatus.Enable &&
    yesterday > deadline &&
    habit.status === HabitStatus.Unfinished
  )
    return { class: "habit-status-expired", msg: "status.expired" };
  if (habit.status === HabitStatus.Complete)
    return { class: "habit-status-complete", msg: "status.complete" };
  else if (habit.isActive === HabitActivationStatus.Enable)
    return { class: "habit-status-unfinished", msg: "status.unfinished" };
  else return { class: "habit-status-disabled", msg: "status.disabled" };
};

const formatDate = (deadline: Date): string => {
  const date = new Date(deadline);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatTime = (time: Time): string => {
  const hours = time.hours.toString().padStart(2, "0");
  const minutes = time.minutes.toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const getCurrentTime = (): Time => {
  const now = new Date();
  return { hours: now.getHours(), minutes: now.getMinutes() };
};

export {
  setBodyOverflow,
  cleanSpaces,
  getCurrentTime,
  formatTime,
  formatDate,
  getStatus,
};
