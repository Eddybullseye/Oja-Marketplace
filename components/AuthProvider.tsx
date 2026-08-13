'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import SignInPage from '@/app/signin/page';

interface User {
    email: string;
    name?: string;
    role: 'buyer' | 'provider';
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (userData: User, rememberMe: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check local storage for persistent authentication (Remember Me)
        const storedAuth = localStorage.getItem('oja_auth');
        const sessionAuth = sessionStorage.getItem('oja_auth');

        if (storedAuth) {
            try {
                const parsed = JSON.parse(storedAuth);
                setUser(parsed);
                setIsAuthenticated(true);
                return;
            } catch (e) {
                localStorage.removeItem('oja_auth');
            }
        }

        if (sessionAuth) {
            try {
                const parsed = JSON.parse(sessionAuth);
                setUser(parsed);
                setIsAuthenticated(true);
                return;
            } catch (e) {
                sessionStorage.removeItem('oja_auth');
            }
        }

        // Default to unauthenticated if no stored session found
        setIsAuthenticated(false);
    }, []);

    const login = (userData: User, rememberMe: boolean) => {
        setUser(userData);
        setIsAuthenticated(true);
        if (rememberMe) {
            localStorage.setItem('oja_auth', JSON.stringify(userData));
            sessionStorage.removeItem('oja_auth');
        } else {
            sessionStorage.setItem('oja_auth', JSON.stringify(userData));
            localStorage.removeItem('oja_auth');
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('oja_auth');
        sessionStorage.removeItem('oja_auth');
    };

    // Show loading spinner while checking auth status
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse">
                        <span className="text-white font-black text-2xl leading-none">O</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-400">Loading Oja Marketplace...</p>
                </div>
            </div>
        );
    }

    // If NOT authenticated, force the Sign In Gateway before rendering any main app layout
    if (!isAuthenticated) {
        return <SignInPage onAuthSuccess={login} isGatewayMode={true} />;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
