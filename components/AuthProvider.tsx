'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthGateway from '@/components/AuthGateway';

interface User {
    email: string;
    name?: string;
    role: 'buyer' | 'provider';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, rememberMe: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
        // Check for persistent session (localStorage) or session-only (sessionStorage)
        const storedUser = localStorage.getItem('oja_auth_user') || sessionStorage.getItem('oja_auth_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (err) {
                console.error('Failed to parse auth session:', err);
                localStorage.removeItem('oja_auth_user');
                sessionStorage.removeItem('oja_auth_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User, rememberMe: boolean) => {
        setUser(userData);
        setIsAuthenticated(true);

        const serialized = JSON.stringify(userData);
        if (rememberMe) {
            localStorage.setItem('oja_auth_user', serialized);
            sessionStorage.removeItem('oja_auth_user');
        } else {
            sessionStorage.setItem('oja_auth_user', serialized);
            localStorage.removeItem('oja_auth_user');
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('oja_auth_user');
        sessionStorage.removeItem('oja_auth_user');
    };

    // Render loading state during initial hydration check
    if (!isMounted || isLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center animate-bounce shadow-lg">
                    <span className="text-white font-black text-xl leading-none">O</span>
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">Loading Oja Marketplace...</div>
            </div>
        );
    }

    // Mandatory Authentication Gateway: block access to app if not logged in
    if (!isAuthenticated) {
        return (
            <AuthGateway
                isGatewayMode={true}
                onAuthSuccess={(userData, rememberMe) => {
                    login(userData, rememberMe);
                }}
            />
        );
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
