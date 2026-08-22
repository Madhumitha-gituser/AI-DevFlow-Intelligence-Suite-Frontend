import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { clearSession, getToken, login, saveSession, type LoginCredentials } from '../services/authService';

interface AuthContextValue {
	token: string | null;
	signIn: (credentials: LoginCredentials, remember: boolean) => Promise<void>;
	signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
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
}
