import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
<<<<<<< HEAD
import { clearSession, getSessionUser, getToken, login, saveSession, type LoginCredentials, type SessionUser } from '../services/authService';

interface AuthContextValue {
  token: string | null;
  user: SessionUser | null;
  signIn: (credentials: LoginCredentials, remember: boolean) => Promise<void>;
  signOut: () => void;
=======
import { clearSession, getToken, login, saveSession, type LoginCredentials } from '../services/authService';

interface AuthContextValue {
	token: string | null;
	signIn: (credentials: LoginCredentials, remember: boolean) => Promise<void>;
	signOut: () => void;
>>>>>>> Madhu
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
<<<<<<< HEAD
  const [token, setToken] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<SessionUser | null>(() => getSessionUser());

  const value = useMemo<AuthContextValue>(() => ({
    token,
    user,
    async signIn(credentials, remember) {
      const response = await login(credentials);
      setToken(saveSession(response, credentials.role, remember));
      setUser(response.user ?? null);
    },
    signOut() {
      clearSession();
      setToken(null);
      setUser(null);
    },
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider.');
  return context;
=======
	const [token, setToken] = useState<string | null>(() => getToken());

	const value = useMemo<AuthContextValue>(() => ({
		token,
		async signIn(credentials, remember) {
			const response = await login(credentials);
				setToken(saveSession(response, remember));
		},
		signOut() {
			clearSession();
			setToken(null);
		},
	}), [token]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider.');
	return context;
>>>>>>> Madhu
}
