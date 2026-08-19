import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { Navigation } from '@/components/Navigation';
import { BottomNav } from '@/components/BottomNav';
import { ServiceWorkerRegistrar } from '@/components/ServiceWorkerRegistrar';
import { PwaInstallPrompt } from '@/components/PwaInstallPrompt';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oja Marketplace - Local Services & Professionals',
  description: 'Find trusted local workers with Oja Escrow Protection.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Oja Marketplace',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0B3D3E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen transition-colors duration-200 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <ThemeProvider>
          <AuthProvider>
            <Navigation />
            <div className="pt-16">
              {children}
            </div>
            <BottomNav />
            <ServiceWorkerRegistrar />
            <PwaInstallPrompt />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
