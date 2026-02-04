import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { addGroupAtom } from '../../atoms';
import * as S from './AddGroupForm.styles';

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

export function AddGroupForm() {
  const [name, setName] = useState('');
  const [color, setColor] = useState(GROUP_COLORS[0]);
  const [expanded, setExpanded] = useState(false);
  const addGroup = useSetAtom(addGroupAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    addGroup({ name: trimmedName, color });
    setName('');
    setColor(GROUP_COLORS[0]);
    setExpanded(false);
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      {expanded ? (
        <>
          <S.Input
            type="text"
            placeholder="Nome do grupo (ex: APIs, Banco de Dados)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <S.ColorPicker>
            <S.ColorLabel>Cor:</S.ColorLabel>
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
              Criar grupo
            </S.SubmitButton>
            <S.CancelButton type="button" onClick={() => setExpanded(false)}>
              Cancelar
            </S.CancelButton>
          </S.Row>
        </>
      ) : (
        <S.ToggleButton type="button" onClick={() => setExpanded(true)}>
          + Novo grupo
        </S.ToggleButton>
      )}
    </S.Form>
  );
}
