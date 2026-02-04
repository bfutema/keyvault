import { Provider as JotaiProvider } from 'jotai';
import { AuthProvider } from '../AuthProvider';
import { ThemeProvider } from '../ThemeProvider';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <JotaiProvider>
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </JotaiProvider>
  );
}
