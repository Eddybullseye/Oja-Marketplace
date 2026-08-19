'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
    CheckCircle,
    Globe,
    User,
    Briefcase,
    KeyRound,
    ArrowLeft,
    Check,
} from 'lucide-react';

interface AuthGatewayProps {
    onAuthSuccess?: (userData: { email: string; name?: string; role: 'buyer' | 'provider' }, rememberMe: boolean) => void;
    isGatewayMode?: boolean;
}

export default function AuthGateway({ onAuthSuccess, isGatewayMode = false }: AuthGatewayProps) {
    const router = useRouter();

    // Mode: 'signin' | 'signup' | 'forgot' | 'verify-otp' | 'reset-password' | 'success' | 'verify-email'
    const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot' | 'verify-otp' | 'reset-password' | 'success' | 'verify-email'>('signin');
    const [role, setRole] = useState<'buyer' | 'provider'>('buyer');

    // Form States
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Sign In Inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Sign Up Inputs
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [signupPassword, setSignupPassword] = useState('');

    // Forgot Password / Reset Inputs
    const [resetEmail, setResetEmail] = useState('');
    const [otpCode, setOtpCode] = useState(['', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const triggerToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    // Handle Sign In Submit
    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            triggerToast(`Welcome back! Signed in as ${role === 'buyer' ? 'Buyer' : 'Service Provider'}.`);
            setTimeout(() => {
                if (role === 'provider') {
                    const workerUrl = process.env.NEXT_PUBLIC_WORKER_PORTAL_URL || 'http://localhost:3002';
                    window.location.href = workerUrl;
                    return;
                }

                if (onAuthSuccess) {
                    onAuthSuccess({ email: email || 'alex.johnson@example.com', name: email.split('@')[0] || 'Alex', role }, rememberMe);
                } else {
                    router.push('/');
                }
            }, 800);
        }, 800);
    };

    // Handle Sign Up Submit
    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAuthMode('verify-email');
        }, 800);
    };

    // Handle Send Reset Code
    const handleSendResetCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetEmail) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAuthMode('verify-otp');
            triggerToast(`Verification code sent to ${resetEmail}`);
        }, 800);
    };

    // Handle Verify OTP
    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAuthMode('reset-password');
            triggerToast('Code verified! Enter your new password.');
        }, 800);
    };

    // Handle Password Reset Submit
    const handlePasswordResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setAuthMode('success');
            triggerToast('Password reset successfully!');
        }, 900);
    };

    // Social Login Simulator
    const handleSocialLogin = (provider: string) => {
        triggerToast(`Signing in with ${provider}...`);
        setTimeout(() => {
            if (role === 'provider') {
                const workerUrl = process.env.NEXT_PUBLIC_WORKER_PORTAL_URL || 'http://localhost:3002';
                window.location.href = workerUrl;
                return;
            }

            if (onAuthSuccess) {
                onAuthSuccess({ email: `${provider.toLowerCase()}user@oja.com`, name: `${provider} User`, role: 'buyer' }, rememberMe);
            } else {
                router.push('/');
            }
        }, 800);
    };

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorative Blur Blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

            {/* Header Logo */}
            <div className="max-w-md w-full mx-auto flex items-center justify-between z-10">
                <div className="flex items-center gap-2 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-xl leading-none">O</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Oja</span>
                        <span className="text-[10px] uppercase font-bold text-zinc-400 -mt-1 tracking-widest">Marketplace</span>
                    </div>
                </div>
                {!isGatewayMode ? (
                    <Link href="/" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors flex items-center gap-1">
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                    </Link>
                ) : (
                    <div className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure Gateway
                    </div>
                )}
            </div>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-6 right-6 z-50 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 py-3 px-4 rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200 border border-zinc-800 dark:border-zinc-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Auth Card Container */}
            <div className="max-w-md w-full mx-auto my-8 z-10">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">

                    {/* Role Switcher Pills (Sign In & Sign Up Modes) */}
                    {(authMode === 'signin' || authMode === 'signup') && (
                        <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-950 p-1.5 rounded-2xl mb-6 border border-zinc-200/50 dark:border-zinc-800">
                            <button
                                type="button"
                                onClick={() => setRole('buyer')}
                                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${role === 'buyer'
                                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                            >
                                <User className="w-3.5 h-3.5 text-primary" /> Buyer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('provider')}
                                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${role === 'provider'
                                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                            >
                                <Briefcase className="w-3.5 h-3.5 text-accent" /> Service Provider
                            </button>
                        </div>
                    )}

                    {/* ==================== SIGN IN VIEW ==================== */}
                    {authMode === 'signin' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    Sign in to your {role === 'buyer' ? 'Buyer' : 'Pro Provider'} account
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                    Enter your login details to access your bookings and messages.
                                </p>
                            </div>

                            <form onSubmit={handleSignIn} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
                                        />
                                        <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setAuthMode('forgot')}
                                            className="text-xs font-bold text-primary dark:text-teal-400 hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-10 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
                                        />
                                        <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs pt-1">
                                    <label className="flex items-center gap-2 cursor-pointer text-zinc-600 dark:text-zinc-400 font-medium">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="accent-primary rounded scale-110"
                                        />
                                        Remember me for 30 days
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span>Signing in...</span>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Social Login Separator */}
                            <div className="relative flex items-center justify-center my-6">
                                <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
                                <span className="bg-white dark:bg-zinc-900 px-3 text-[10px] uppercase font-bold text-zinc-400 absolute">
                                    Or continue with
                                </span>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Google')}
                                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-red-500" /> Google
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Apple')}
                                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-zinc-900 dark:text-white" /> Apple
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Facebook')}
                                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-blue-600" /> Facebook
                                </button>
                            </div>

                            {/* Toggle to Sign Up */}
                            <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                                Don&apos;t have an account yet?{' '}
                                <button
                                    type="button"
                                    onClick={() => setAuthMode('signup')}
                                    className="font-bold text-primary dark:text-teal-400 hover:underline ml-1"
                                >
                                    Create an account
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ==================== SIGN UP VIEW ==================== */}
                    {authMode === 'signup' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    Create a new {role === 'buyer' ? 'Buyer' : 'Provider'} account
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                    Join Oja to book verified local pros or offer your services.
                                </p>
                            </div>

                            <form onSubmit={handleSignUp} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Alex Johnson"
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
                                        />
                                        <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
                                        />
                                        <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
                                        />
                                        <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                        Create Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            minLength={8}
                                            value={signupPassword}
                                            onChange={(e) => setSignupPassword(e.target.value)}
                                            placeholder="At least 8 characters"
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-10 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
                                        />
                                        <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                                    By creating an account, you agree to Oja&apos;s{' '}
                                    <span className="font-bold text-zinc-700 dark:text-zinc-300">Terms of Service</span> and{' '}
                                    <span className="font-bold text-zinc-700 dark:text-zinc-300">Privacy Policy</span>.
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-teal-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span>Creating Account...</span>
                                    ) : (
                                        <>
                                            <span>Register Account</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Toggle to Sign In */}
                            <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setAuthMode('signin')}
                                    className="font-bold text-primary dark:text-teal-400 hover:underline ml-1"
                                >
                                    Sign in here
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ==================== VERIFY EMAIL VIEW ==================== */}
                    {authMode === 'verify-email' && (
                        <div className="text-center py-4 space-y-4">
                            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Check Your Email App</h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                We've sent a confirmation link to <span className="font-bold text-zinc-900 dark:text-white">{email || 'your email'}</span>.
                                Please check your inbox and click the link to activate your account.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    triggerToast('Resent confirmation link to your email!');
                                }}
                                className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                            >
                                Resend Link
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (onAuthSuccess) {
                                        onAuthSuccess({ email: email || 'new.user@example.com', name: fullName || 'New User', role }, rememberMe);
                                    } else {
                                        router.push('/');
                                    }
                                }}
                                className="w-full bg-primary hover:bg-teal-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 mt-4"
                            >
                                Simulate Email Link Clicked
                            </button>
                        </div>
                    )}

                    {/* ==================== FORGOTTEN PASSWORD VIEW ==================== */}
                    {authMode === 'forgot' && (
                        <div className="space-y-6">
                            <button
                                type="button"
                                onClick={() => setAuthMode('signin')}
                                className="text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                            </button>

                            <div>
                                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
                                    <KeyRound className="w-6 h-6 text-primary" /> Reset Password
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                    Enter the email address associated with your account, and we will send you a 4-digit recovery code.
                                </p>
                            </div>

                            <form onSubmit={handleSendResetCode} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                        Account Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            required
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
                                        />
                                        <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? <span>Sending Code...</span> : <span>Send Recovery Code</span>}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ==================== VERIFY OTP CODE VIEW ==================== */}
                    {authMode === 'verify-otp' && (
                        <div className="space-y-6">
                            <button
                                type="button"
                                onClick={() => setAuthMode('forgot')}
                                className="text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Back
                            </button>

                            <div>
                                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    Enter 4-Digit Code
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                    We sent a 4-digit verification code to <span className="font-bold text-zinc-900 dark:text-white">{resetEmail}</span>.
                                </p>
                            </div>

                            <form onSubmit={handleVerifyOtp} className="space-y-5">
                                <div className="flex justify-center gap-3">
                                    {[0, 1, 2, 3].map((idx) => (
                                        <input
                                            key={idx}
                                            id={`otp-${idx}`}
                                            type="text"
                                            maxLength={1}
                                            value={otpCode[idx]}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                const newOtp = [...otpCode];
                                                newOtp[idx] = val;
                                                setOtpCode(newOtp);
                                                if (val && idx < 3) {
                                                    const nextInput = document.getElementById(`otp-${idx + 1}`);
                                                    nextInput?.focus();
                                                }
                                            }}
                                            className="w-12 h-14 bg-zinc-50 dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl text-center text-xl font-bold text-zinc-900 dark:text-zinc-50 focus:border-primary outline-none transition-colors"
                                        />
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || otpCode.join('').length < 4}
                                    className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? <span>Verifying...</span> : <span>Verify Code</span>}
                                </button>

                                <p className="text-center text-xs text-zinc-400">
                                    Didn&apos;t receive a code?{' '}
                                    <button
                                        type="button"
                                        onClick={() => triggerToast('Resent verification code to your email!')}
                                        className="font-bold text-primary dark:text-teal-400 hover:underline"
                                    >
                                        Resend Code
                                    </button>
                                </p>
                            </form>
                        </div>
                    )}

                    {/* ==================== CREATE NEW PASSWORD VIEW ==================== */}
                    {authMode === 'reset-password' && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    Set New Password
                                </h2>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                                    Choose a strong password containing at least 8 characters.
                                </p>
                            </div>

                            <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            minLength={8}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="At least 8 characters"
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-10 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
                                        />
                                        <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            minLength={8}
                                            value={confirmNewPassword}
                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            placeholder="Re-enter new password"
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-10 pr-10 text-xs font-medium text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400"
                                        />
                                        <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-primary hover:bg-teal-600 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? <span>Updating Password...</span> : <span>Update Password</span>}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ==================== SUCCESS VIEW ==================== */}
                    {authMode === 'success' && (
                        <div className="text-center py-4 space-y-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                                <Check className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Password Reset Complete</h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Your password has been successfully updated. You can now log in with your new credentials.
                            </p>
                            <button
                                type="button"
                                onClick={() => setAuthMode('signin')}
                                className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                            >
                                Return to Sign In
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <footer className="text-center text-xs text-zinc-400 dark:text-zinc-600 z-10 py-4">
                &copy; 2026 Oja Marketplace Inc. All rights reserved. ·{' '}
                <Link href="/profile" className="hover:underline">
                    Privacy & Security
                </Link>
            </footer>
        </main>
    );
}
