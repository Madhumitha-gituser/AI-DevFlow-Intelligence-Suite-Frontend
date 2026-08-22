import { apiRequest } from './api';

export interface LoginCredentials {
	email: string;
	password: string;
}

export type RegisterCredentials = LoginCredentials;

export interface AuthResponse {
	access_token?: string;
	token?: string;
	user?: unknown;
}

const TOKEN_KEY = 'devflow_access_token';
const ROLE_KEY = 'devflow_user_role';

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
	return apiRequest<AuthResponse>('/auth/login', {
		method: 'POST',
		body: JSON.stringify(credentials),
	});
}

export async function register(credentials: RegisterCredentials): Promise<{ message: string }> {
	return apiRequest<{ message: string }>('/auth/register', {
		method: 'POST',
		body: JSON.stringify(credentials),
	});
}

export function saveSession(response: AuthResponse, remember: boolean): string {
	const token = response.access_token ?? response.token;
	if (!token) {
		throw new Error('The sign-in response did not include an access token.');
	}

	const storage = remember ? localStorage : sessionStorage;
	storage.setItem(TOKEN_KEY, token);
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
}
