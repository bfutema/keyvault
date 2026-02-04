import { atom } from 'jotai';
import type { Group } from '../types';
import { getGroups, saveGroups, saveKeys } from '../utils/storage';
import { generateId } from '../utils/id';
import { keysAtom } from './keys';

const GROUPS_COLORS = [
  '#0a84ff',
  '#bf5af2',
  '#30d158',
  '#ff9f0a',
  '#ff375f',
  '#64d2ff',
  '#5ac8fa',
  '#af52de',
];

const groupsAtom = atom<Group[]>(getGroups());

export const groupsListAtom = atom(
  (get) => get(groupsAtom),
  (_get, set, groups: Group[]) => {
    set(groupsAtom, groups);
    saveGroups(groups);
  }
);

export const addGroupAtom = atom(null, (get, set, entry: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>) => {
  const groups = get(groupsAtom);
  const now = new Date().toISOString();
  const usedColors = groups.map((g: Group) => g.color);
  const color = entry.color || GROUPS_COLORS.find((c) => !usedColors.includes(c)) || GROUPS_COLORS[0];
  const newGroup: Group = {
    ...entry,
    color,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  set(groupsAtom, [...groups, newGroup]);
  saveGroups([...groups, newGroup]);
});

export const updateGroupAtom = atom(null, (get, set, { id, ...updates }: Partial<Group> & { id: string }) => {
  const groups = get(groupsAtom);
  const updated = groups.map((g) =>
    g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g
  );
  set(groupsAtom, updated);
  saveGroups(updated);
});

export const deleteGroupAtom = atom(null, (get, set, id: string) => {
  const groups = get(groupsAtom).filter((g) => g.id !== id);
  const keys = get(keysAtom).filter((k) => k.groupId !== id);
  set(groupsAtom, groups);
  set(keysAtom, keys);
  saveGroups(groups);
  saveKeys(keys);
});
