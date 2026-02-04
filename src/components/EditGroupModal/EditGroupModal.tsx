import { useState, useEffect } from 'react';
import { useSetAtom } from 'jotai';
import type { Group } from '../../types';
import { updateGroupAtom } from '../../atoms';
import * as S from './EditGroupModal.styles';

const GROUP_COLORS = [
  '#0a84ff',
  '#bf5af2',
  '#30d158',
  '#ff9f0a',
  '#ff375f',
  '#64d2ff',
  '#5ac8fa',
  '#af52de',
];

interface EditGroupModalProps {
  group: Group | null;
  onClose: () => void;
}

export function EditGroupModal({ group, onClose }: EditGroupModalProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(GROUP_COLORS[0]);
  const updateGroup = useSetAtom(updateGroupAtom);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setColor(group.color);
    }
  }, [group]);

  if (!group) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    updateGroup({ id: group.id, name: trimmedName, color });
    onClose();
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>Editar grupo</S.Title>
          <S.CloseButton onClick={onClose} type="button" title="Fechar">
            ×
          </S.CloseButton>
        </S.Header>
        <S.Form onSubmit={handleSubmit}>
          <S.Label>Nome</S.Label>
          <S.Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do grupo"
          />
          <S.Label>Cor</S.Label>
          <S.ColorPicker>
            {GROUP_COLORS.map((c) => (
              <S.ColorOption
                key={c}
                $color={c}
                $selected={color === c}
                type="button"
                onClick={() => setColor(c)}
                title={c}
              />
            ))}
          </S.ColorPicker>
          <S.Row>
            <S.SubmitButton type="submit" disabled={!name.trim()}>
              Salvar
            </S.SubmitButton>
            <S.CancelButton type="button" onClick={onClose}>
              Cancelar
            </S.CancelButton>
          </S.Row>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
}
