/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";

const AUTH_STORAGE_KEY = "authData";

export interface StoredAuth {
  token: string;
  email?: string;
  refreshToken?: string | null;
}

export const getStoredAuth = (): StoredAuth | null => {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setStoredAuth = (auth: StoredAuth) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const clearStoredAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

interface AuthContextType {
  token: string | null;
  email?: string;
  login: (token: string, email?: string, refreshToken?: string | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const stored = getStoredAuth();
    if (stored) {
      setToken(stored.token);
      setEmail(stored.email);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    (newToken: string, email?: string, refreshToken?: string | null) => {
      const auth: StoredAuth = {
        token: newToken,
        refreshToken: refreshToken ?? null,
        email,
      };

      setStoredAuth(auth);
      setToken(newToken);
      setEmail(email);
    },
    []
  );

  const logout = useCallback(() => {
    clearStoredAuth();
    setToken(null);
    setEmail(undefined);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      token,
      email,
      login,
      logout,
      isAuthenticated: !!token,
      isLoading,
    }),
    [token, email, login, logout, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
