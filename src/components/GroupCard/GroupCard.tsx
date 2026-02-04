import { useAtomValue, useSetAtom } from 'jotai';
import type { Group } from '../../types';
import { keysByGroupAtom, deleteGroupAtom } from '../../atoms';
import { KeyCard } from '../KeyCard';
import { AddKeyForm } from '../AddKeyForm';
import * as S from './GroupCard.styles';

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

interface GroupCardProps {
  group: Group;
  onEditGroup?: (group: Group) => void;
}

export function GroupCard({ group, onEditGroup }: GroupCardProps) {
  const keysByGroup = useAtomValue(keysByGroupAtom);
  const deleteGroup = useSetAtom(deleteGroupAtom);
  const keys = keysByGroup.get(group.id) ?? [];

  const handleDelete = () => {
    if (keys.length > 0) {
      if (!window.confirm(`O grupo "${group.name}" tem ${keys.length} chave(s). Todas serão removidas. Continuar?`)) {
        return;
      }
    } else if (!window.confirm(`Remover o grupo "${group.name}"?`)) {
      return;
    }
    deleteGroup(group.id);
  };

  return (
    <S.Wrapper>
      <S.Header $color={group.color}>
        <S.TitleRow>
          <S.ColorBadge $color={group.color} />
          <S.Title>{group.name}</S.Title>
          <S.GroupActions>
            {onEditGroup && (
              <S.IconButton onClick={() => onEditGroup(group)} type="button" title="Editar grupo">
                <EditIcon />
              </S.IconButton>
            )}
            <S.IconButton onClick={handleDelete} type="button" title="Excluir grupo">
              <TrashIcon />
            </S.IconButton>
          </S.GroupActions>
        </S.TitleRow>
      </S.Header>
      <S.Content>
        <AddKeyForm groupId={group.id} />
        <S.KeysList>
          {keys.map((entry) => (
            <KeyCard key={entry.id} entry={entry} />
          ))}
        </S.KeysList>
      </S.Content>
    </S.Wrapper>
  );
}
