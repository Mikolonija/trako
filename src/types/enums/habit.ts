export enum HabitStatus {
  Unfinished = 'unfinished',
  Complete = 'complete',
}

export enum HabitActivationStatus {
  Disable = 'disabled',
  Enable = 'enabled',
}

export enum HabitErrorID {
  NameEmpty,
  TimeInvalid,
  StartDateInvalid,
  EndDateInvalid,
  NameLength,
}

export enum SpaceCleanOption {
  TrimAndReplace,
  RemoveAll,
}
