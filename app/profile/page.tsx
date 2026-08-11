'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { User, ShieldCheck, CreditCard, Bell, Moon, Sun, Monitor, Save } from 'lucide-react';

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace, Springfield'
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    escrowUpdates: true
  });
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert('Profile details updated successfully!');
    }, 1000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">My Profile</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Manage account information, check platform balances, and tailor preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Top/Left Cards: User details and statistics */}
        <div className="md:col-span-1 space-y-6">
          {/* User Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm text-center">
            <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-850 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-primary">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">{formData.name}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Joined Oja in June 2026</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-455 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" /> Verified Client
            </div>
          </div>

          {/* Wallet Balance Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
              <CreditCard className="w-4.5 h-4.5 text-zinc-450" /> Oja Wallet & Escrow
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Locked in Active Escrow</p>
                <p className="text-2xl font-black text-zinc-950 dark:text-white mt-0.5">$190.00</p>
              </div>
              <div className="pt-3 border-t border-zinc-150 dark:border-zinc-850">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Refunding Balance Available</p>
                <div className="flex items-baseline justify-between mt-0.5">
                  <p className="text-xl font-bold text-zinc-800 dark:text-zinc-300">$350.00</p>
                  <button onClick={() => alert('Withdrawal initiated! Processing standard transfer...')} className="text-xs font-semibold text-primary hover:underline">Withdraw</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Cards: Profile Edit Forms & Settings */}
        <div className="md:col-span-2 space-y-6">
          {/* Edit details form */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-4">Account Information</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-550 dark:text-zinc-400 mb-1.5 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Mobile Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Billing Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-2.5 px-5 rounded-xl text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Theme Preferences */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1 flex items-center gap-2">Theme customization</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Choose how Oja looks on your device.</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`py-3 px-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${theme === 'light'
                    ? 'border-primary bg-primary/5 text-primary dark:text-teal-400'
                    : 'border-zinc-200 bg-transparent text-zinc-500 hover:bg-zinc-200 dark:border-zinc-805 dark:hover:bg-zinc-850'
                  }`}
              >
                <Sun className="w-5 h-5" />
                <span className="text-xs font-bold">Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`py-3 px-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${theme === 'dark'
                    ? 'border-primary bg-primary/5 text-primary dark:text-teal-400'
                    : 'border-zinc-200 bg-transparent text-zinc-500 hover:bg-zinc-200 dark:border-zinc-805 dark:hover:bg-zinc-850'
                  }`}
              >
                <Moon className="w-5 h-5" />
                <span className="text-xs font-bold">Dark</span>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`py-3 px-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${theme === 'system'
                    ? 'border-primary bg-primary/5 text-primary dark:text-teal-400'
                    : 'border-zinc-200 bg-transparent text-zinc-500 hover:bg-zinc-200 dark:border-zinc-805 dark:hover:bg-zinc-850'
                  }`}
              >
                <Monitor className="w-5 h-5" />
                <span className="text-xs font-bold">System</span>
              </button>
            </div>
          </div>

          {/* Interactive Toggle Settings */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1 flex items-center gap-2">
              <Bell className="w-5 h-5 text-zinc-450" /> Alerts & Notifications
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Choose which notifications you wish to receive.</p>
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Email Updates</h4>
                  <p className="text-xs text-zinc-505 dark:text-zinc-450 mt-0.5">Recieve monthly summaries, receipts, and order statuses.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                  className="accent-primary scale-110"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-150 dark:border-zinc-850">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-850 dark:text-zinc-200">SMS Alerts</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-0.5">Get urgent updates on active disputes or escrow releases.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications(prev => ({ ...prev, sms: e.target.checked }))}
                  className="accent-primary scale-110"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-150 dark:border-zinc-850">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Immediate Escrow Notices</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-0.5">Get security notices when funds are held or released.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.escrowUpdates}
                  onChange={(e) => setNotifications(prev => ({ ...prev, escrowUpdates: e.target.checked }))}
                  className="accent-primary scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

