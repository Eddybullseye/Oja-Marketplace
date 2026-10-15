/**
 * Oja Marketplace (Buyer Portal) — Centralized API Client
 * Base URL: process.env.NEXT_PUBLIC_API_URL (default: http://localhost:3001/api/v1)
 *
 * Auth: JWT Bearer token stored in localStorage as `oja_access_token`
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_NESTJS_API_URL || 'http://localhost:3001/api/v1';

function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('oja_access_token');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers ?? {}),
    };

    const res = await fetch(`${BASE}${path}`, { ...options, headers });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(error.message ?? 'API Error');
    }
    if (res.status === 204) return undefined as T;
    return res.json() as Promise<T>;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginResponse {
    accessToken: string;
    user: { id: string; email: string; role: string; name?: string };
}

/** POST /api/v1/auth/register — buyer registration */
export const authRegister = (email: string, password: string, name?: string) =>
    request<LoginResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, role: 'buyer', name }),
    });

/** POST /api/v1/auth/login */
export const authLogin = (email: string, password: string) =>
    request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

/** POST /api/v1/auth/logout */
export const authLogout = (refreshToken: string) =>
    request<void>('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
    });

/** POST /api/v1/auth/forgot-password */
export const authForgotPassword = (emailOrPhone: string) =>
    request<{ message: string }>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ emailOrPhone }),
    });

// ─── Bookings (Buyer) ────────────────────────────────────────────────────────

export interface CreateBookingPayload {
    workerId: string;
    serviceId: string;
    scheduledDate: string; // ISO string
    price: number;
}

export interface Booking {
    id: string;
    workerId: string;
    buyerId: string;
    serviceId: string;
    status: 'pending' | 'accepted' | 'completed' | 'disputed';
    scheduledDate: string;
    price: number;
    escrowStatus: 'held' | 'released' | 'refunded';
    createdAt: string;
}

/** POST /api/v1/bookings — create booking as buyer */
export const createBooking = (payload: CreateBookingPayload) =>
    request<Booking>('/bookings', {
        method: 'POST',
        body: JSON.stringify(payload),
    });

/** GET /api/v1/bookings/buyer — list my bookings */
export const getBuyerBookings = () =>
    request<Booking[]>('/bookings/buyer');

/** PATCH /api/v1/bookings/:id/status */
export const updateBookingStatus = (id: string, status: Booking['status']) =>
    request<Booking>(`/bookings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });

// ─── Payments ────────────────────────────────────────────────────────────────

/** POST /api/v1/payments/hold — fund escrow for a booking */
export const holdEscrow = (bookingId: string) =>
    request<{ success: boolean }>('/payments/hold', {
        method: 'POST',
        body: JSON.stringify({ bookingId }),
        headers: { 'idempotency-key': `hold-${bookingId}-${Date.now()}` },
    });

/** POST /api/v1/payments/release — release funds to worker */
export const releaseEscrow = (bookingId: string) =>
    request<{ success: boolean }>('/payments/release', {
        method: 'POST',
        body: JSON.stringify({ bookingId }),
        headers: { 'idempotency-key': `release-${bookingId}-${Date.now()}` },
    });

/** POST /api/v1/payments/refund */
export const refundEscrow = (bookingId: string) =>
    request<{ success: boolean }>('/payments/refund', {
        method: 'POST',
        body: JSON.stringify({ bookingId }),
        headers: { 'idempotency-key': `refund-${bookingId}-${Date.now()}` },
    });

// ─── Users ───────────────────────────────────────────────────────────────────

/** POST /api/v1/users/:id/report */
export const reportUser = (reportedUserId: string, reason: string, context: string) =>
    request<{ message: string }>(`/users/${reportedUserId}/report`, {
        method: 'POST',
        body: JSON.stringify({ reason, context }),
    });

/** POST /api/v1/users/:id/block */
export const blockUser = (userId: string) =>
    request<{ message: string }>(`/users/${userId}/block`, { method: 'POST' });

/** DELETE /api/v1/users/:id/block */
export const unblockUser = (userId: string) =>
    request<{ message: string }>(`/users/${userId}/block`, { method: 'DELETE' });

/** PATCH /api/v1/users/me/deactivate */
export const deactivateAccount = () =>
    request<{ message: string }>('/users/me/deactivate', { method: 'PATCH' });

/** DELETE /api/v1/users/me */
export const deleteAccount = () =>
    request<void>('/users/me', { method: 'DELETE' });

// ─── WebSocket (Chat) ─────────────────────────────────────────────────────────
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:3001';
