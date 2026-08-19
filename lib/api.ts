// Centralized API Client for connecting to NestJS Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_NESTJS_API_URL || 'http://localhost:3001/api/v1';

export interface ApiResponse<T = any> {
    data?: T;
    message?: string;
    statusCode?: number;
    error?: string;
}

/**
 * Standard fetch wrapper for NestJS API endpoints with auth header support.
 */
export async function apiFetch<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('oja_auth_token') : null;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(errorBody.message || `API error (${response.status})`);
        }

        return await response.json();
    } catch (err: any) {
        console.error(`[NestJS API Error] ${endpoint}:`, err);
        throw err;
    }
}
