import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navigation } from '@/components/Navigation';
import { BottomNav } from '@/components/BottomNav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oja Marketplace - Local Services & Professionals',
  description: 'Find trusted local workers with Oja Escrow Protection.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen transition-colors duration-200 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <ThemeProvider>
          <Navigation />
          <div className="pt-16">
            {children}
          </div>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}

