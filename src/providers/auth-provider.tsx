import { LOCAL_STORAGE_KEYS } from '@/constants/storage-keys';
import { createSafeContext } from '@/utils/create-safe-context';
import { useCallback, useState } from 'react';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

const [AuthProvider, useAuthContext] =
  createSafeContext<AuthContextValue>('AuthContext');

const AuthProviderImpl = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)),
  );

  const login = useCallback((accessToken: string) => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }, []);

  return (
    <AuthProvider
      isAuthenticated={isAuthenticated}
      login={login}
      logout={logout}
    >
      {children}
    </AuthProvider>
  );
};

export { AuthProviderImpl as AuthProvier, useAuthContext };
