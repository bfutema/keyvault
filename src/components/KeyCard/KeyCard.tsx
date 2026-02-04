import { useState } from 'react';
import { useSetAtom } from 'jotai';
import type { KeyEntry } from '../../types';
import { deleteKeyAtom } from '../../atoms';
import { CopyButton } from '../CopyButton';
import * as S from './KeyCard.styles';

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
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

interface KeyCardProps {
  entry: KeyEntry;
}

export function KeyCard({ entry }: KeyCardProps) {
  const [showValue, setShowValue] = useState(false);
  const deleteKey = useSetAtom(deleteKeyAtom);

  const handleDelete = () => {
    if (window.confirm(`Remover "${entry.name}"?`)) {
      deleteKey(entry.id);
    }
  };

  return (
    <S.Card>
      <S.Header>
        <S.Name>{entry.name}</S.Name>
        <S.Actions>
          <CopyButton value={entry.value} label="Copiar" size="sm" />
          <S.ToggleButton onClick={() => setShowValue((v) => !v)} type="button" title={showValue ? 'Ocultar' : 'Mostrar'}>
            {showValue ? <EyeOffIcon /> : <EyeIcon />}
          </S.ToggleButton>
          <S.DeleteButton onClick={handleDelete} type="button" title="Excluir">
            <TrashIcon />
          </S.DeleteButton>
        </S.Actions>
      </S.Header>
      <S.ValueArea $visible={showValue}>
        {showValue ? (
          <S.Value>{entry.value}</S.Value>
        ) : (
          <S.MaskedValue>{'•'.repeat(Math.min(entry.value.length, 32))}</S.MaskedValue>
        )}
      </S.ValueArea>
    </S.Card>
  );
}
