'use client';

import { useEffect } from 'react';

/**
 * Mounts in the root layout (client-side only) and registers /sw.js.
 * Shows a non-intrusive banner when a new version is available.
 */
export function ServiceWorkerRegistrar() {
    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

        navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then((registration) => {
                // Poll for updates every 60 s
                setInterval(() => registration.update(), 60_000);

                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    if (!newWorker) return;

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content is available – show a subtle toast
                            showUpdateBanner();
                        }
                    });
                });
            })
            .catch((err) => console.error('[SW] Registration failed:', err));
    }, []);

    return null;
}

function showUpdateBanner() {
    if (document.getElementById('oja-sw-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'oja-sw-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML = `
    <span>🚀 A new version of Oja is available!</span>
    <button id="oja-sw-reload" style="margin-left:12px;font-weight:600;text-decoration:underline;background:none;border:none;cursor:pointer;color:inherit;">
      Refresh
    </button>
    <button id="oja-sw-dismiss" style="margin-left:8px;opacity:0.6;background:none;border:none;cursor:pointer;color:inherit;font-size:1.1em;" aria-label="Dismiss">
      ✕
    </button>
  `;
    Object.assign(banner.style, {
        position: 'fixed',
        bottom: '80px',   // clears BottomNav
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '9999',
        background: '#0B3D3E',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '999px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        animation: 'oja-slide-up 0.3s ease',
    });

    // Inject keyframe if needed
    if (!document.getElementById('oja-sw-style')) {
        const style = document.createElement('style');
        style.id = 'oja-sw-style';
        style.textContent = `
      @keyframes oja-slide-up {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    `;
        document.head.appendChild(style);
    }

    document.body.appendChild(banner);

    document.getElementById('oja-sw-reload')?.addEventListener('click', () => window.location.reload());
    document.getElementById('oja-sw-dismiss')?.addEventListener('click', () => banner.remove());
}
