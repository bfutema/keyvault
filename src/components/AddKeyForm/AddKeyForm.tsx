import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { addKeyAtom } from '../../atoms';
import * as S from './AddKeyForm.styles';

interface AddKeyFormProps {
  groupId: string;
}

export function AddKeyForm({ groupId }: AddKeyFormProps) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const addKey = useSetAtom(addKeyAtom);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedValue = value.trim();
    if (!trimmedName || !trimmedValue) return;
    addKey({ name: trimmedName, value: trimmedValue, groupId });
    setName('');
    setValue('');
    setExpanded(false);
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      {expanded ? (
        <>
          <S.Input
            type="text"
            placeholder="Nome da chave (ex: API Key)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <S.Textarea
            placeholder="Valor da chave ou token"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={2}
          />
          <S.Row>
            <S.SubmitButton type="submit" disabled={!name.trim() || !value.trim()}>
              Adicionar
            </S.SubmitButton>
            <S.CancelButton type="button" onClick={() => setExpanded(false)}>
              Cancelar
            </S.CancelButton>
          </S.Row>
        </>
      ) : (
        <S.ToggleButton type="button" onClick={() => setExpanded(true)}>
          + Nova chave
        </S.ToggleButton>
      )}
    </S.Form>
  );
}
