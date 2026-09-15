const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8002';

export class ApiError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
	}
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
	let response: Response;
	try {
		response = await fetch(`${API_BASE_URL}${path}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...(options.headers ?? {}),
			},
		});
	} catch (cause) {
		const reason = cause instanceof Error && cause.message ? ` (${cause.message})` : '';
		throw new ApiError(`Cannot connect to the backend at ${API_BASE_URL}${path}${reason}`, 0);
	}

	const body = await response.json().catch(() => null);
	if (!response.ok) {
		const detail = typeof body?.detail === 'string' ? body.detail : 'The request could not be completed.';
		throw new ApiError(detail, response.status);
	}

	return body as T;
}
