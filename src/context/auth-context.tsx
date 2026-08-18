import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Auth } from "~/config/auth";

type AuthContextValue = {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setAuthTokens: (accessToken: string, refreshToken?: string | null) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const readAuthState = () => ({
  accessToken: Auth.getToken(),
  refreshToken: Auth.getRefreshToken(),
  isAuthenticated: Auth.isAuthenticated(),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const syncFromStorage = useCallback(() => {
    const next = readAuthState();
    setAccessToken(next.accessToken);
    setRefreshToken(next.refreshToken);
    setIsAuthenticated(next.isAuthenticated);
  }, []);

  useEffect(() => {
    syncFromStorage();
    setIsHydrated(true);
    return Auth.subscribe(syncFromStorage);
  }, [syncFromStorage]);

  const setAuthTokens = useCallback((access: string, refresh?: string | null) => {
    Auth.setAuthTokens(access, refresh);
  }, []);

  const clearAuth = useCallback(() => {
    Auth.removeToken();
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      isAuthenticated,
      isHydrated,
      setAuthTokens,
      clearAuth,
    }),
    [accessToken, refreshToken, isAuthenticated, isHydrated, setAuthTokens, clearAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
