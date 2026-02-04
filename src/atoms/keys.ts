import { atom } from 'jotai';
import type { KeyEntry } from '../types';
import { getKeys, saveKeys } from '../utils/storage';
import { generateId } from '../utils/id';

export const keysAtom = atom<KeyEntry[]>(getKeys());

export const keysListAtom = atom(
  (get) => get(keysAtom),
  (_get, set, keys: KeyEntry[]) => {
    set(keysAtom, keys);
    saveKeys(keys);
  }
);

export const addKeyAtom = atom(null, (get, set, entry: Omit<KeyEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
  const keys = get(keysAtom);
  const now = new Date().toISOString();
  const newKey: KeyEntry = {
    ...entry,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  set(keysAtom, [...keys, newKey]);
  saveKeys([...keys, newKey]);
});

export const updateKeyAtom = atom(null, (get, set, { id, ...updates }: Partial<KeyEntry> & { id: string }) => {
  const keys = get(keysAtom);
  const updated = keys.map((k) =>
    k.id === id ? { ...k, ...updates, updatedAt: new Date().toISOString() } : k
  );
  set(keysAtom, updated);
  saveKeys(updated);
});

export const deleteKeyAtom = atom(null, (get, set, id: string) => {
  const keys = get(keysAtom).filter((k) => k.id !== id);
  set(keysAtom, keys);
  saveKeys(keys);
});

export const keysByGroupAtom = atom((get) => {
  const keys = get(keysAtom);
  const byGroup = new Map<string, KeyEntry[]>();
  for (const key of keys) {
    const list = byGroup.get(key.groupId) ?? [];
    list.push(key);
    byGroup.set(key.groupId, list);
  }
  return byGroup;
});
