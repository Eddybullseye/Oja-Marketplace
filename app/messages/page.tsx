import { Navigation } from '@/components/Navigation';
import { BottomNav } from '@/components/BottomNav';

export default function MessagesPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Messages</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Chat with professionals.</p>
        
        <div className="mt-8 flex justify-center items-center h-64 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">Your inbox is empty.</p>
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
