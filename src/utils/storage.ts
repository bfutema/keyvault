import type { KeyEntry, Group } from '../types';

const STORAGE_KEYS = 'keyvault_keys';
const STORAGE_GROUPS = 'keyvault_groups';

export function getKeys(): KeyEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveKeys(keys: KeyEntry[]): void {
  localStorage.setItem(STORAGE_KEYS, JSON.stringify(keys));
}

export function getGroups(): Group[] {
  try {
    const data = localStorage.getItem(STORAGE_GROUPS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveGroups(groups: Group[]): void {
  localStorage.setItem(STORAGE_GROUPS, JSON.stringify(groups));
}
