import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AUTH_KEY = 'keyvault_auth';

const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
};

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getStoredAuth(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(getStoredAuth);

  useEffect(() => {
    const stored = getStoredAuth();
    setIsAuthenticated(stored);
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    const valid =
      username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;
    if (valid) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
    }
    return valid;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const value: AuthContextValue = { isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
