import styled from 'styled-components';

export const Button = styled.button<{ $size: 'sm' | 'md'; $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme, $size }) => ($size === 'sm' ? theme.spacing.xs : theme.spacing.sm)} ${({ theme, $size }) => ($size === 'sm' ? theme.spacing.sm : theme.spacing.md)};
  font-size: ${({ theme, $size }) => ($size === 'sm' ? theme.fontSize.xs : theme.fontSize.sm)};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceElevated};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryHover};
  }

  ${({ $copied, theme }) =>
    $copied &&
    `
    color: ${theme.colors.success};
    border-color: ${theme.colors.success};
  `}
`;
