export interface NavigationList {
  path: string;
  text: string;
  activeImg: string;
  alt: string;
  noActiveImg: string;
  activeLink: string[];
}

interface SettingOption {
  value: string;
  label: string;
}

export interface Setting {
  key: string;
  title: string;
  active: () => string;
  activeValue: () => string;
  change: (value: string) => void;
  options: SettingOption[];
}
