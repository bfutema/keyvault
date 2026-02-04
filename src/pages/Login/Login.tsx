import { useState } from 'react';
import { useAuth } from '../../providers';
import { ThemeToggle } from '../../components/ThemeToggle';
import * as S from './Login.styles';

interface LoginProps {
  onSuccess?: () => void;
}

export function Login({ onSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (success) {
      onSuccess?.();
    } else {
      setError('Usuário ou senha inválidos. Use admin/admin para demonstrativo.');
    }
  };

  return (
    <S.Page>
      <S.ThemeToggleWrapper>
        <ThemeToggle />
      </S.ThemeToggleWrapper>

      <S.Card>
        <S.Logo>KeyVault</S.Logo>
        <S.Subtitle>Entre para acessar suas chaves</S.Subtitle>

        <S.Form onSubmit={handleSubmit}>
          <S.Field>
            <S.Label htmlFor="username">Usuário</S.Label>
            <S.Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              autoFocus
            />
          </S.Field>

          <S.Field>
            <S.Label htmlFor="password">Senha</S.Label>
            <S.Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </S.Field>

          {error && <S.Error>{error}</S.Error>}

          <S.SubmitButton type="submit">Entrar</S.SubmitButton>
        </S.Form>

        <S.DemoHint>Demonstrativo: admin / admin</S.DemoHint>
      </S.Card>
    </S.Page>
  );
}
