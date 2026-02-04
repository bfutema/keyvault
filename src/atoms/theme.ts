import { atom } from 'jotai';
import type { ThemeMode } from '../types';

const THEME_KEY = 'keyvault_theme';

function getStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // ignore
  }
  return 'dark';
}

export const themeModeAtom = atom<ThemeMode>(getStoredTheme());

export const setThemeModeAtom = atom(null, (_get, set, mode: ThemeMode) => {
  set(themeModeAtom, mode);
  localStorage.setItem(THEME_KEY, mode);
});

export const toggleThemeAtom = atom(null, (get, set) => {
  const current = get(themeModeAtom);
  const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
  set(themeModeAtom, next);
  localStorage.setItem(THEME_KEY, next);
});
