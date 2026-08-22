const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
	const response = await fetch(`${API_BASE_URL}${path}`, {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...(options.headers ?? {}),
		},
	});

	const body = await response.json().catch(() => null);
	if (!response.ok) {
		const detail = typeof body?.detail === 'string' ? body.detail : 'The request could not be completed.';
		throw new ApiError(detail, response.status);
	}

	return body as T;
}
