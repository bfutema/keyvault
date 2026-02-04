import { useState } from 'react';
import { useAtomValue } from 'jotai';
import type { Group } from '../../types';
import { groupsListAtom } from '../../atoms';
import { useAuth } from '../../providers';
import { GroupCard } from '../../components/GroupCard';
import { AddGroupForm } from '../../components/AddGroupForm';
import { EditGroupModal } from '../../components/EditGroupModal';
import { ThemeToggle } from '../../components/ThemeToggle';
import * as S from './Home.styles';

export function Home() {
  const groups = useAtomValue(groupsListAtom);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const { logout } = useAuth();

  return (
    <S.Page>
      <S.Header>
        <S.TitleRow>
          <S.Logo>KeyVault</S.Logo>
          <S.HeaderActions>
            <S.LogoutButton onClick={logout} type="button" title="Sair">
              Sair
            </S.LogoutButton>
            <ThemeToggle />
          </S.HeaderActions>
        </S.TitleRow>
        <S.Subtitle>Centralize suas chaves e tokens de desenvolvimento</S.Subtitle>
      </S.Header>

      <S.Content>
        <S.AddGroupSection>
          <AddGroupForm />
        </S.AddGroupSection>

        <S.GroupsGrid>
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onEditGroup={(group: Group) => setEditingGroup(group)}
            />
          ))}
        </S.GroupsGrid>

        {groups.length === 0 && (
          <S.EmptyState>
            <S.EmptyIcon>🔐</S.EmptyIcon>
            <S.EmptyTitle>Nenhum grupo ainda</S.EmptyTitle>
            <S.EmptyText>
              Crie um grupo acima para começar a organizar suas chaves e tokens.
            </S.EmptyText>
          </S.EmptyState>
        )}
      </S.Content>

      <EditGroupModal group={editingGroup} onClose={() => setEditingGroup(null)} />
    </S.Page>
  );
}
