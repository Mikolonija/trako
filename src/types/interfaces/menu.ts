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
  title: string;
  text: string;
}

export interface Setting {
  key: string;
  title: string;
  active: () => string;
  activeValue: () => string;
  change: (value: string) => void;
  options: SettingOption[];
}
