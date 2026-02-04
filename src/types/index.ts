export interface KeyEntry {
  id: string;
  name: string;
  value: string;
  groupId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export type ThemeMode = 'light' | 'dark';
