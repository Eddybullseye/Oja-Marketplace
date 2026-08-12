'use client';

import { useState, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import {
  User, ShieldCheck, CreditCard, Bell, Moon, Sun, Monitor, Save,
  Landmark, Plus, Trash2, Eye, EyeOff, Lock, Globe, HelpCircle,
  FileText, LogOut, ChevronRight, MapPin, Phone, Mail, Shield,
  Wallet, Receipt, Camera, Link, Calendar, FileCheck, AlertTriangle,
  Smartphone, Fingerprint, History, Star, Scale, BookOpen, Cookie,
  Download, Clock, Search, X, CheckCircle, Check, Key, MessageSquare,
  FileDown
} from 'lucide-react';

interface PaymentMethod {
  id: number;
  type: 'card' | 'bank';
  label: string;
  last4: string;
  isDefault: boolean;
  brand?: string;
  bankName?: string;
}

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();

  // Personal info
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 019-2834',
    address: '742 Evergreen Terrace, Springfield',
    city: 'Springfield',
    state: 'IL',
    zip: '62701'
  });

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, type: 'card', label: 'Visa ending', last4: '4242', isDefault: true, brand: 'Visa' },
    { id: 2, type: 'bank', label: 'Chase Checking', last4: '9871', isDefault: false, bankName: 'Chase Bank' }
  ]);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    type: 'card' as 'card' | 'bank',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    accountName: ''
  });
  const [showCvv, setShowCvv] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  // Profile picture
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5MB.'); return; }
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Notifications
  const [notifications, setNotifications] = useState({
    emailReceipts: true,
    smsBooking: true,
    escrowUpdates: true,
    promotions: false,
    securityAlerts: true,
    weeklyDigest: false,
    newProviderNearby: false,
    priceDropAlerts: true,
  });

  // Privacy
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showActivity: false,
    twoFactor: false,
    loginAlerts: true,
    biometricLogin: false,
    dataSharing: false,
  });

  // Connected accounts
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: true,
    apple: false,
    facebook: false,
  });

  // Booking preferences
  const [bookingPrefs, setBookingPrefs] = useState({
    defaultRadius: '25',
    autoConfirm: false,
    preferredTime: 'morning',
    instantBook: true,
    requireReviews: true,
  });

  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Favorite categories selection
  const [favoriteCategories, setFavoriteCategories] = useState<string[]>([
    'Home Cleaning', 'Plumbing'
  ]);
  const toggleCategory = (cat: string) => {
    setFavoriteCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Active Sessions
  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'Springfield, IL', time: 'Active now', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Springfield, IL', time: '2 hours ago', current: false },
    { id: 3, device: 'Firefox on MacBook', location: 'Chicago, IL', time: '3 days ago', current: false },
  ]);
  const handleRevokeSession = (id: number, deviceName: string) => {
    setActiveSessions(prev => prev.filter(s => s.id !== id));
    showToast(`Revoked session for ${deviceName}`);
  };

  // Legal Modal
  interface LegalDoc {
    title: string;
    desc: string;
    updated: string;
    sections: { heading: string; body: string }[];
  }
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDoc | null>(null);

  // Help Modal
  const [activeHelpType, setActiveHelpType] = useState<'faq' | 'escrow' | 'contact' | null>(null);

  // Support Form
  const [supportForm, setSupportForm] = useState({ subject: '', message: '', priority: 'normal' });

  // Password Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  // Deactivate & Delete Modals
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Download Data function
  const handleDownloadData = () => {
    const data = {
      profile: formData,
      paymentMethodsCount: paymentMethods.length,
      notifications,
      privacy,
      bookingPrefs,
      favoriteCategories,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oja-buyer-account-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Your account data has been downloaded successfully!');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast('Profile settings updated successfully!');
    }, 800);
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(prev => prev.map(pm => ({ ...pm, isDefault: pm.id === id })));
  };

  const handleRemovePayment = (id: number) => {
    const method = paymentMethods.find(pm => pm.id === id);
    if (method?.isDefault) {
      alert('Cannot remove default payment method. Set another method as default first.');
      return;
    }
    if (confirm('Remove this payment method?')) {
      setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    }
  };

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Date.now();

    if (newPayment.type === 'card') {
      if (!newPayment.cardNumber || !newPayment.expiry || !newPayment.cvv || !newPayment.nameOnCard) {
        alert('Please fill all card fields.');
        return;
      }
      setPaymentMethods(prev => [...prev, {
        id: newId,
        type: 'card',
        label: 'Card ending',
        last4: newPayment.cardNumber.slice(-4),
        isDefault: prev.length === 0,
        brand: 'Card'
      }]);
    } else {
      if (!newPayment.bankName || !newPayment.routingNumber || !newPayment.accountNumber || !newPayment.accountName) {
        alert('Please fill all bank account fields.');
        return;
      }
      setPaymentMethods(prev => [...prev, {
        id: newId,
        type: 'bank',
        label: newPayment.bankName,
        last4: newPayment.accountNumber.slice(-4),
        isDefault: prev.length === 0,
        bankName: newPayment.bankName
      }]);
    }

    setNewPayment({ type: 'card', cardNumber: '', expiry: '', cvv: '', nameOnCard: '', bankName: '', routingNumber: '', accountNumber: '', accountName: '' });
    setShowAddPayment(false);
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'bookingPrefs', label: 'Booking Preferences', icon: Calendar },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Sun },
    { id: 'connected', label: 'Connected Accounts', icon: Link },
    { id: 'privacy', label: 'Privacy & Security', icon: Lock },
    { id: 'legal', label: 'Legal', icon: Scale },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Account Settings</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Manage your buyer account, payment methods, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1 space-y-4">
          {/* User Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm text-center">
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleProfileImageChange} className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="relative w-20 h-20 rounded-full mx-auto mb-3 group">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary" />
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </button>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">{formData.firstName} {formData.lastName}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Buyer Account</p>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mb-3">Member since Jan 2026</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </div>
          </div>

          {/* Nav Sections */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-2 ${activeSection === section.id
                    ? 'bg-primary/5 border-primary text-primary dark:text-teal-400'
                    : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              );
            })}
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors border-l-2 border-transparent">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Spending Summary */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 mb-3 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-zinc-400" /> Spending Summary
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Held in Active Escrow</p>
                <p className="text-xl font-black text-zinc-950 dark:text-white mt-0.5">$190.00</p>
              </div>
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Total Spent (All Time)</p>
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-300 mt-0.5">$1,420.00</p>
              </div>
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400">Completed Jobs</p>
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-300 mt-0.5">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-3 space-y-6">

          {/* ==================== PERSONAL INFO ==================== */}
          {activeSection === 'personal' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">Personal Information</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Update your personal details and billing address.</p>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">First Name</label>
                    <input type="text" value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Last Name</label>
                    <input type="text" value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase flex items-center gap-1"><Mail className="w-3 h-3" /> Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</label>
                    <input type="text" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50" />
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Billing Address</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Street Address</label>
                      <input type="text" value={formData.address} onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">City</label>
                        <input type="text" value={formData.city} onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">State</label>
                        <input type="text" value={formData.state} onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Zip</label>
                        <input type="text" value={formData.zip} onChange={(e) => setFormData(prev => ({ ...prev, zip: e.target.value }))}
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" disabled={saving}
                    className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-2.5 px-5 rounded-xl text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center gap-1.5 shadow-sm">
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ==================== PAYMENT METHODS ==================== */}
          {activeSection === 'payment' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Payment Methods</h3>
                  <button onClick={() => setShowAddPayment(!showAddPayment)}
                    className="text-xs font-bold text-primary dark:text-teal-400 flex items-center gap-1 hover:underline">
                    <Plus className="w-4 h-4" /> Add New
                  </button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Manage the cards and bank accounts used to fund your Oja bookings and escrow payments.</p>

                {/* Existing Methods */}
                <div className="space-y-3">
                  {paymentMethods.map(pm => (
                    <div key={pm.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${pm.type === 'card' ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'}`}>
                          {pm.type === 'card' ? <CreditCard className="w-5 h-5" /> : <Landmark className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{pm.type === 'card' ? `${pm.brand} •••• ${pm.last4}` : `${pm.bankName} •••• ${pm.last4}`}</p>
                            {pm.isDefault && (
                              <span className="text-[9px] font-bold uppercase bg-primary/10 text-primary dark:text-teal-400 px-1.5 py-0.5 rounded">Default</span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">{pm.type === 'card' ? 'Credit / Debit Card' : 'Bank Account (ACH)'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!pm.isDefault && (
                          <button onClick={() => handleSetDefault(pm.id)}
                            className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-primary dark:hover:text-teal-400 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-primary dark:hover:border-teal-400 transition-colors">
                            Set Default
                          </button>
                        )}
                        <button onClick={() => handleRemovePayment(pm.id)} className="text-zinc-400 hover:text-red-500 transition-colors p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Payment Form */}
              {showAddPayment && (
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-4">Add Payment Method</h3>

                  {/* Tabs */}
                  <div className="flex mb-5 border-b border-zinc-200 dark:border-zinc-800">
                    <button onClick={() => setNewPayment(prev => ({ ...prev, type: 'card' }))}
                      className={`py-2.5 px-4 text-sm font-semibold border-b-2 transition-colors ${newPayment.type === 'card' ? 'border-primary text-primary dark:text-teal-400' : 'border-transparent text-zinc-500'}`}>
                      <CreditCard className="w-4 h-4 inline mr-1.5" /> Card
                    </button>
                    <button onClick={() => setNewPayment(prev => ({ ...prev, type: 'bank' }))}
                      className={`py-2.5 px-4 text-sm font-semibold border-b-2 transition-colors ${newPayment.type === 'bank' ? 'border-primary text-primary dark:text-teal-400' : 'border-transparent text-zinc-500'}`}>
                      <Landmark className="w-4 h-4 inline mr-1.5" /> Bank Account
                    </button>
                  </div>

                  <form onSubmit={handleAddPayment} className="space-y-4">
                    {newPayment.type === 'card' ? (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Name on Card</label>
                          <input type="text" value={newPayment.nameOnCard} onChange={(e) => setNewPayment(prev => ({ ...prev, nameOnCard: e.target.value }))} placeholder="e.g. Alex Johnson"
                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Card Number</label>
                          <input type="text" value={newPayment.cardNumber} onChange={(e) => setNewPayment(prev => ({ ...prev, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) }))} placeholder="1234 5678 9012 3456" maxLength={16}
                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400 tracking-widest" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Expiry Date</label>
                            <input type="text" value={newPayment.expiry} onChange={(e) => setNewPayment(prev => ({ ...prev, expiry: e.target.value }))} placeholder="MM/YY" maxLength={5}
                              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">CVV</label>
                            <div className="relative">
                              <input type={showCvv ? 'text' : 'password'} value={newPayment.cvv} onChange={(e) => setNewPayment(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} placeholder="•••" maxLength={4}
                                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 pr-10 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400" />
                              <button type="button" onClick={() => setShowCvv(!showCvv)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                                {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Account Holder Name</label>
                          <input type="text" value={newPayment.accountName} onChange={(e) => setNewPayment(prev => ({ ...prev, accountName: e.target.value }))} placeholder="e.g. Alex Johnson"
                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Bank Name</label>
                          <input type="text" value={newPayment.bankName} onChange={(e) => setNewPayment(prev => ({ ...prev, bankName: e.target.value }))} placeholder="e.g. Chase Bank"
                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Routing Number</label>
                          <input type="text" value={newPayment.routingNumber} onChange={(e) => setNewPayment(prev => ({ ...prev, routingNumber: e.target.value.replace(/\D/g, '').slice(0, 9) }))} placeholder="9 digits" maxLength={9}
                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400 tracking-widest" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Account Number</label>
                          <div className="relative">
                            <input type={showAccountNumber ? 'text' : 'password'} value={newPayment.accountNumber} onChange={(e) => setNewPayment(prev => ({ ...prev, accountNumber: e.target.value.replace(/\D/g, '') }))} placeholder="Account number"
                              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 pr-10 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary placeholder-zinc-400 tracking-widest" />
                            <button type="button" onClick={() => setShowAccountNumber(!showAccountNumber)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                              {showAccountNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 text-amber-800 dark:text-amber-400 text-xs p-3 rounded-xl flex gap-2 items-start">
                      <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>Your payment information is encrypted end-to-end and stored securely. Oja never shares your financial data with service providers.</p>
                    </div>

                    <div className="flex gap-3 justify-end pt-2">
                      <button type="button" onClick={() => setShowAddPayment(false)}
                        className="px-4 py-2.5 text-xs font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                        Cancel
                      </button>
                      <button type="submit"
                        className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-2.5 px-5 rounded-xl text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center gap-1.5 shadow-sm">
                        <Plus className="w-4 h-4" /> Add Method
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Recent Transactions */}
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-zinc-400" /> Recent Transactions
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Your last 3 escrow transactions.</p>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Jenkins', service: 'Home Cleaning', amount: 115.50, date: 'Aug 14, 2026', status: 'Held in Escrow' },
                    { name: 'Marcus Chen', service: 'Pipe Repair', amount: 93.50, date: 'Aug 11, 2026', status: 'Held in Escrow' },
                    { name: 'Elena Rodriguez', service: 'Electrical Work', amount: 209.00, date: 'Aug 5, 2026', status: 'Released' }
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{tx.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{tx.service} · {tx.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">-${tx.amount.toFixed(2)}</p>
                        <p className={`text-[10px] font-semibold ${tx.status === 'Released' ? 'text-zinc-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================== NOTIFICATIONS ==================== */}
          {activeSection === 'notifications' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">Notification Preferences</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Control what alerts you receive and how you receive them.</p>
              <div className="space-y-0.5">
                {([
                  { key: 'emailReceipts', title: 'Email Receipts', desc: 'Get a receipt emailed after every escrow payment.' },
                  { key: 'smsBooking', title: 'SMS Booking Alerts', desc: 'Receive text messages when bookings are confirmed or modified.' },
                  { key: 'escrowUpdates', title: 'Escrow Status Updates', desc: 'Notifications when funds are held, released, or disputes filed.' },
                  { key: 'securityAlerts', title: 'Security Alerts', desc: 'Get notified of new sign-ins or suspicious activity.' },
                  { key: 'promotions', title: 'Promotions & Offers', desc: 'Discounts and platform offers from Oja marketplace.' },
                  { key: 'weeklyDigest', title: 'Weekly Activity Digest', desc: 'A weekly summary email of your marketplace activity.' },
                  { key: 'newProviderNearby', title: 'New Providers Nearby', desc: 'Get alerted when new top-rated service providers join your area.' },
                  { key: 'priceDropAlerts', title: 'Price Drop Alerts', desc: 'Receive notifications when providers you\'ve bookmarked lower their rates.' },
                ] as const).map(({ key, title, desc }, i) => (
                  <div key={key} className={`flex items-center justify-between py-4 ${i > 0 ? 'border-t border-zinc-100 dark:border-zinc-800' : ''}`}>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-0.5">{desc}</p>
                    </div>
                    <input type="checkbox" checked={notifications[key]}
                      onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="accent-primary scale-110" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== APPEARANCE ==================== */}
          {activeSection === 'appearance' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">Appearance</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Choose how Oja looks on your device.</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light' as const, icon: Sun, label: 'Light' },
                  { value: 'dark' as const, icon: Moon, label: 'Dark' },
                  { value: 'system' as const, icon: Monitor, label: 'System' },
                ].map(({ value, icon: Icon, label }) => (
                  <button key={value} onClick={() => setTheme(value)}
                    className={`py-4 px-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${theme === value
                      ? 'border-primary bg-primary/5 text-primary dark:text-teal-400'
                      : 'border-zinc-200 bg-transparent text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800'
                      }`}>
                    <Icon className="w-6 h-6" />
                    <span className="text-xs font-bold">{label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Language & Region</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Default language and currency settings.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Language</label>
                    <select className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase">Currency</label>
                    <select className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>NGN (₦)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== BOOKING PREFERENCES ==================== */}
          {activeSection === 'bookingPrefs' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">Booking Preferences</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Customize how you discover and book service providers.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase flex items-center gap-1"><MapPin className="w-3 h-3" /> Default Search Radius</label>
                    <select value={bookingPrefs.defaultRadius} onChange={(e) => setBookingPrefs(prev => ({ ...prev, defaultRadius: e.target.value }))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none">
                      <option value="5">5 miles</option>
                      <option value="10">10 miles</option>
                      <option value="25">25 miles</option>
                      <option value="50">50 miles</option>
                      <option value="100">100+ miles</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase flex items-center gap-1"><Clock className="w-3 h-3" /> Preferred Scheduling Time</label>
                    <select value={bookingPrefs.preferredTime} onChange={(e) => setBookingPrefs(prev => ({ ...prev, preferredTime: e.target.value }))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 px-3.5 text-sm text-zinc-900 dark:text-zinc-50 outline-none">
                      <option value="morning">Morning (8 AM – 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM – 5 PM)</option>
                      <option value="evening">Evening (5 PM – 9 PM)</option>
                      <option value="any">No Preference</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800 space-y-0.5">
                  {([
                    { key: 'instantBook' as const, title: 'Instant Booking', desc: 'Allow providers to confirm your booking instantly without manual approval.' },
                    { key: 'autoConfirm' as const, title: 'Auto-Confirm Completion', desc: 'Automatically confirm job completion after 48 hours if no dispute is raised.' },
                    { key: 'requireReviews' as const, title: 'Only Show Reviewed Providers', desc: 'Filter search results to only show providers with at least one review.' },
                  ]).map(({ key, title, desc }, i) => (
                    <div key={key} className={`flex items-center justify-between py-4 ${i > 0 ? 'border-t border-zinc-100 dark:border-zinc-800' : ''}`}>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</h4>
                        <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
                      </div>
                      <input type="checkbox" checked={bookingPrefs[key]} onChange={(e) => setBookingPrefs(prev => ({ ...prev, [key]: e.target.checked }))} className="accent-primary scale-110" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Favorite Categories</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Select your most-used service categories for personalized recommendations.</p>
                <div className="flex flex-wrap gap-2">
                  {['Home Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Landscaping', 'Moving', 'Handyman', 'HVAC', 'Carpentry', 'Pest Control'].map((cat) => {
                    const isSelected = favoriteCategories.includes(cat);
                    return (
                      <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 ${isSelected
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-primary hover:text-primary dark:hover:text-teal-400 hover:bg-primary/5'
                          }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                        {cat}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <button type="button" onClick={() => showToast('Booking preferences saved!')}
                    className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-2 px-4 rounded-xl text-xs hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center gap-1.5 shadow-sm">
                    <Save className="w-3.5 h-3.5" /> Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== CONNECTED ACCOUNTS ==================== */}
          {activeSection === 'connected' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">Connected Accounts</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Link external accounts for faster sign-in and enhanced features.</p>
              <div className="space-y-3">
                {([
                  { key: 'google' as const, name: 'Google', desc: 'Sign in with Google and sync contacts.', color: 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400' },
                  { key: 'apple' as const, name: 'Apple', desc: 'Use Apple ID for secure, private sign-in.', color: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300' },
                  { key: 'facebook' as const, name: 'Facebook', desc: 'Connect Facebook for social recommendations.', color: 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' },
                ]).map(({ key, name, desc, color }) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
                      </div>
                    </div>
                    <button onClick={() => {
                      const nextState = !connectedAccounts[key];
                      setConnectedAccounts(prev => ({ ...prev, [key]: nextState }));
                      showToast(nextState ? `Connected to ${name} account.` : `Disconnected from ${name}.`);
                    }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${connectedAccounts[key]
                        ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                        : 'border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-primary hover:text-primary'}`}>
                      {connectedAccounts[key] ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== PRIVACY & SECURITY ==================== */}
          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">Privacy & Security</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Control your account visibility and security settings.</p>
                <div className="space-y-0.5">
                  {([
                    { key: 'showProfile', title: 'Show Profile to Providers', desc: 'Let service providers see your name and review history.' },
                    { key: 'showActivity', title: 'Show Booking Activity', desc: 'Allow providers to see your recent booking history.' },
                    { key: 'twoFactor', title: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account sign-in.' },
                    { key: 'loginAlerts', title: 'Login Alerts', desc: 'Get notified via email when your account is accessed from a new device.' },
                    { key: 'biometricLogin', title: 'Biometric Login', desc: 'Use fingerprint or face recognition to sign in on supported devices.' },
                    { key: 'dataSharing', title: 'Data Sharing for Analytics', desc: 'Allow anonymized usage data to help improve Oja\'s platform experience.' },
                  ] as const).map(({ key, title, desc }, i) => (
                    <div key={key} className={`flex items-center justify-between py-4 ${i > 0 ? 'border-t border-zinc-100 dark:border-zinc-800' : ''}`}>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-450 mt-0.5">{desc}</p>
                      </div>
                      <input type="checkbox" checked={privacy[key]}
                        onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.checked }))}
                        className="accent-primary scale-110" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> Active Sessions</h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Devices currently signed in to your account.</p>
                <div className="space-y-3">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between py-3 px-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-4 h-4 text-zinc-400" />
                        <div>
                          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                            {session.device}
                            {session.current && <span className="text-[9px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded">This device</span>}
                          </p>
                          <p className="text-xs text-zinc-500">{session.location} · {session.time}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <button onClick={() => handleRevokeSession(session.id, session.device)} className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">Revoke</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-3">Account Actions</h4>
                <div className="space-y-3">
                  <button onClick={() => setShowPasswordModal(true)} className="w-full flex items-center justify-between py-3 px-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-zinc-400" /> Change Password</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                  <button onClick={handleDownloadData} className="w-full flex items-center justify-between py-3 px-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <span className="flex items-center gap-2"><Download className="w-4 h-4 text-zinc-400" /> Download My Data</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </button>
                  <button onClick={() => setShowDeactivateModal(true)} className="w-full flex items-center justify-between py-3 px-4 bg-amber-50 dark:bg-amber-950/10 rounded-xl text-sm font-semibold text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 hover:bg-amber-100 dark:hover:bg-amber-950/20 transition-colors">
                    <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Deactivate Account</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => setShowDeleteModal(true)} className="w-full flex items-center justify-between py-3 px-4 bg-red-50 dark:bg-red-950/10 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-950/20 transition-colors">
                    <span className="flex items-center gap-2"><Trash2 className="w-4 h-4" /> Delete Account</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==================== LEGAL ==================== */}
          {activeSection === 'legal' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">Legal</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Review Oja&apos;s policies, terms, and legal documentation.</p>
                <div className="space-y-3">
                  {[
                    { title: 'Terms of Service', desc: 'The terms governing your use of the Oja marketplace platform.', icon: FileText, updated: 'Updated Jul 2026', sections: [{ heading: '1. User Obligations', body: 'By creating a buyer account on Oja, you agree to respect provider agreements, maintain valid contact information, and execute bookings strictly within platform protocols.' }, { heading: '2. Escrow Protection', body: 'All funds committed for service bookings are safely escrowed by Oja payments. Providers are compensated only upon your verified sign-off.' }] },
                    { title: 'Privacy Policy', desc: 'How we collect, use, and protect your personal information.', icon: Lock, updated: 'Updated Jul 2026', sections: [{ heading: '1. Information Collection', body: 'We store your contact details, booking notes, and transactional history to optimize marketplace recommendations and security.' }, { heading: '2. Data Confidentiality', body: 'Your personal phone number and exact address are shared with service providers only after a booking is confirmed.' }] },
                    { title: 'Cookie Policy', desc: 'Information about how Oja uses cookies and tracking technologies.', icon: Cookie, updated: 'Updated Jun 2026', sections: [{ heading: '1. Essential Cookies', body: 'We use authentication cookies to keep you signed in securely across sessions.' }] },
                    { title: 'Escrow & Payment Terms', desc: 'Policies governing escrow payments, refunds, and dispute resolution.', icon: Shield, updated: 'Updated Jul 2026', sections: [{ heading: '1. Escrow Guarantee', body: 'Funds are securely deposited prior to job commencement and held safely until work completion is confirmed.' }] },
                    { title: 'Buyer Protection Policy', desc: 'Your rights and protections as a buyer on the Oja marketplace.', icon: ShieldCheck, updated: 'Updated Jul 2026', sections: [{ heading: '1. Satisfaction Guarantee', body: 'If a service provider fails to perform the agreed work, you are entitled to a full refund or free rebooking.' }] },
                    { title: 'Dispute Resolution Policy', desc: 'How disputes between buyers and service providers are handled.', icon: Scale, updated: 'Updated Jun 2026', sections: [{ heading: '1. Dispute Window', body: 'You have up to 48 hours following job completion to submit a dispute claim via your booking dashboard.' }] },
                    { title: 'Community Guidelines', desc: 'Standards of conduct for all marketplace participants.', icon: BookOpen, updated: 'Updated May 2026', sections: [{ heading: '1. Mutual Respect', body: 'Harassment, discrimination, or deceptive behavior will lead to immediate account suspension.' }] },
                    { title: 'Acceptable Use Policy', desc: 'Rules about what is and isn\'t allowed on the Oja platform.', icon: FileCheck, updated: 'Updated Jun 2026', sections: [{ heading: '1. Permitted Use', body: 'Oja may only be used for legitimate service discovery, booking, and professional engagement.' }] },
                  ].map((doc, i) => {
                    const Icon = doc.icon;
                    return (
                      <button key={i} onClick={() => setActiveLegalDoc(doc)} className="w-full text-left flex items-center justify-between py-3.5 px-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{doc.title}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{doc.desc}</p>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">{doc.updated}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5">
                <div className="flex gap-3 items-start">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Your Buyer Rights</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">As an Oja buyer, you are protected by our comprehensive Buyer Protection Policy. All payments are held in escrow until you confirm the service is complete, and you can raise a dispute within 48 hours of job completion.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== HELP & SUPPORT ==================== */}
          {activeSection === 'help' && (
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-1">Help & Support</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">Get help with your account, bookings, or payments.</p>
              <div className="space-y-3">
                {[
                  { title: 'FAQ & Knowledge Base', desc: 'Find answers to common questions and troubleshooting guides.', icon: HelpCircle, action: () => setActiveHelpType('faq') },
                  { title: 'How Escrow Protection Works', desc: 'Learn how Oja keeps your payments safe during every booking.', icon: ShieldCheck, action: () => setActiveHelpType('escrow') },
                  { title: 'Contact Support', desc: 'Reach our team via live chat or email for personalized help.', icon: Mail, action: () => setActiveHelpType('contact') },
                  { title: 'Terms of Service', desc: 'Review Oja marketplace terms, conditions, and policies.', icon: FileText, action: () => setActiveSection('legal') },
                  { title: 'Privacy Policy', desc: 'Understand how we handle and protect your personal data.', icon: Lock, action: () => setActiveSection('legal') },
                ].map(({ title, desc, icon: Icon, action }, i) => (
                  <button key={i} onClick={action} className="w-full text-left flex items-center justify-between py-3.5 px-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{title}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{desc}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-primary dark:group-hover:text-teal-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==================== TOAST NOTIFICATION ==================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 py-3 px-4 rounded-xl shadow-xl flex items-center gap-3 text-sm font-semibold border border-zinc-800 dark:border-zinc-200 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-zinc-400 hover:text-white dark:hover:text-zinc-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ==================== LEGAL DOCUMENT MODAL ==================== */}
      {activeLegalDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
              <div>
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">{activeLegalDoc.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{activeLegalDoc.updated}</p>
              </div>
              <button onClick={() => setActiveLegalDoc(null)} className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-700 dark:text-zinc-300">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">{activeLegalDoc.desc}</p>
              {activeLegalDoc.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{sec.heading}</h4>
                  <p className="leading-relaxed text-xs text-zinc-600 dark:text-zinc-400">{sec.body}</p>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
              <button onClick={() => showToast(`Downloaded copy of ${activeLegalDoc.title}`)} className="text-xs font-semibold text-primary dark:text-teal-400 flex items-center gap-1.5 hover:underline">
                <Download className="w-3.5 h-3.5" /> Download PDF Copy
              </button>
              <button onClick={() => setActiveLegalDoc(null)} className="px-4 py-2 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-xs rounded-xl hover:opacity-90 transition-opacity">
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== HELP & SUPPORT MODAL ==================== */}
      {activeHelpType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                {activeHelpType === 'faq' && <><HelpCircle className="w-5 h-5 text-primary" /> FAQ & Knowledge Base</>}
                {activeHelpType === 'escrow' && <><ShieldCheck className="w-5 h-5 text-emerald-500" /> How Escrow Protection Works</>}
                {activeHelpType === 'contact' && <><Mail className="w-5 h-5 text-blue-500" /> Contact Oja Support</>}
              </h3>
              <button onClick={() => setActiveHelpType(null)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeHelpType === 'faq' && (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto text-xs">
                {[
                  { q: 'How do I pay a service provider safely?', a: 'All payments on Oja go into our secure Escrow system. Funds are released to the provider only after you review and approve the completed job.' },
                  { q: 'What if a service provider does not show up?', a: 'If a provider misses a scheduled appointment without notice, you can cancel instantly for a 100% full refund with zero cancellation fees.' },
                  { q: 'How do disputes work?', a: 'You have 48 hours after job completion to open a dispute. Our dedicated resolution team steps in to review evidence and guarantee fair resolution.' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-1.5">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">{item.q}</p>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            )}

            {activeHelpType === 'escrow' && (
              <div className="space-y-4 text-xs">
                <p className="text-zinc-600 dark:text-zinc-400">Oja Escrow guarantees your payment remains 100% safe at every step of the transaction.</p>
                <div className="space-y-3">
                  {[
                    { step: '1. Book & Deposit', desc: 'When you book a provider, your payment is placed securely into an escrow account.' },
                    { step: '2. Service Execution', desc: 'The provider performs the requested service according to your agreed requirements.' },
                    { step: '3. Inspect & Release', desc: 'You inspect the work and click "Release Payment" to pay the provider.' },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-zinc-100">{s.step}</p>
                        <p className="text-zinc-500 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeHelpType === 'contact' && (
              <form onSubmit={(e) => { e.preventDefault(); setActiveHelpType(null); showToast('Support ticket submitted! We will email you shortly.'); }} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">Subject</label>
                  <input required value={supportForm.subject} onChange={(e) => setSupportForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief summary of your issue..." className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-3 text-xs outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">Message Details</label>
                  <textarea required rows={4} value={supportForm.message} onChange={(e) => setSupportForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Describe your issue or question in detail..." className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-3 text-xs outline-none" />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setActiveHelpType(null)} className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:opacity-90">Submit Ticket</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ==================== CHANGE PASSWORD MODAL ==================== */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50 flex items-center gap-2"><Lock className="w-5 h-5 text-primary" /> Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-zinc-400 hover:text-zinc-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (passwordForm.newPass !== passwordForm.confirm) { alert('New passwords do not match!'); return; }
              setShowPasswordModal(false);
              setPasswordForm({ current: '', newPass: '', confirm: '' });
              showToast('Password changed successfully!');
            }} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">Current Password</label>
                <input type="password" required value={passwordForm.current} onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-3 text-xs outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">New Password</label>
                <input type="password" required minLength={8} value={passwordForm.newPass} onChange={(e) => setPasswordForm(prev => ({ ...prev, newPass: e.target.value }))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-3 text-xs outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">Confirm New Password</label>
                <input type="password" required minLength={8} value={passwordForm.confirm} onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-3 text-xs outline-none" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:opacity-90">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== DEACTIVATE MODAL ==================== */}
      {showDeactivateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-lg">Deactivate Buyer Account?</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Deactivating your account will temporarily disable your profile and pause active notifications. You can reactivate anytime by logging back in.</p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowDeactivateModal(false)} className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold">Cancel</button>
              <button onClick={() => { setShowDeactivateModal(false); showToast('Account deactivated.'); }} className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-xl hover:bg-amber-700">Deactivate Account</button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== DELETE MODAL ==================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <Trash2 className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-lg">Permanently Delete Account?</h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">This action cannot be undone. All your saved payment methods, booking preferences, and history will be permanently deleted.</p>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-xl text-xs font-semibold">Cancel</button>
              <button onClick={() => { setShowDeleteModal(false); showToast('Account deletion request submitted.'); }} className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700">Delete Account</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
