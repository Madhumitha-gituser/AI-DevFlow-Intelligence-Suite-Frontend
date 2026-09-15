import { apiRequest } from './api';

<<<<<<< HEAD
export type UserRole = 'admin' | 'project_manager' | 'developer' | 'team_member';

export interface LoginCredentials {
	email: string;
	password: string;
	role: UserRole;
}

export type SessionUser = NonNullable<AuthResponse['user']>;
=======
export interface LoginCredentials {
	email: string;
	password: string;
}

export type RegisterCredentials = LoginCredentials;
>>>>>>> Madhu

export interface AuthResponse {
	access_token?: string;
	token?: string;
<<<<<<< HEAD
	user?: { id: number; full_name: string; email: string; role: UserRole };
=======
	user?: unknown;
>>>>>>> Madhu
}

const TOKEN_KEY = 'devflow_access_token';
const ROLE_KEY = 'devflow_user_role';
<<<<<<< HEAD
const USER_KEY = 'devflow_user';
=======
>>>>>>> Madhu

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
	return apiRequest<AuthResponse>('/auth/login', {
		method: 'POST',
		body: JSON.stringify(credentials),
	});
}

<<<<<<< HEAD
export async function register(email: string, password: string, _fullName?: string, _role?: UserRole): Promise<void> {
	await apiRequest('/auth/register', {
		method: 'POST',
		body: JSON.stringify({ email, password, full_name: _fullName ?? '', role: _role ?? 'team_member' }),
	});
}

export function saveSession(response: AuthResponse, role: UserRole, remember: boolean): string {
=======
export async function register(credentials: RegisterCredentials): Promise<{ message: string }> {
	return apiRequest<{ message: string }>('/auth/register', {
		method: 'POST',
		body: JSON.stringify(credentials),
	});
}

export function saveSession(response: AuthResponse, remember: boolean): string {
>>>>>>> Madhu
	const token = response.access_token ?? response.token;
	if (!token) {
		throw new Error('The sign-in response did not include an access token.');
	}

	const storage = remember ? localStorage : sessionStorage;
	storage.setItem(TOKEN_KEY, token);
<<<<<<< HEAD
	storage.setItem(ROLE_KEY, response.user?.role ?? role);
	if (response.user) storage.setItem(USER_KEY, JSON.stringify(response.user));
=======
>>>>>>> Madhu
	return token;
}

export function getToken(): string | null {
	return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);
}

export function clearSession(): void {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(ROLE_KEY);
	sessionStorage.removeItem(TOKEN_KEY);
	sessionStorage.removeItem(ROLE_KEY);
<<<<<<< HEAD
	localStorage.removeItem(USER_KEY);
	sessionStorage.removeItem(USER_KEY);
}

export function getSessionUser(): SessionUser | null {
	const value = localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY);
	if (!value) return null;
	try { return JSON.parse(value) as SessionUser; } catch { return null; }
=======
>>>>>>> Madhu
}
