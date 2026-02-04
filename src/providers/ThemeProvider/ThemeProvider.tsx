import { useAtomValue } from 'jotai';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { themeModeAtom } from '../../atoms';
import { lightTheme, darkTheme } from '../../styles/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = useAtomValue(themeModeAtom);
  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
