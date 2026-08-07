/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCircle, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Settings,
  Heart,
  Moon,
  Sun,
  Monitor,
  CheckCircle,
  Star,
  Camera,
  X
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const [showCamera, setShowCamera] = React.useState(false);
  const [avatar, setAvatar] = React.useState("https://picsum.photos/seed/avatar1/150/150");
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Start camera stream when modal opens
  React.useEffect(() => {
    if (showCamera && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Error accessing camera:", err));
    }
    return () => {
      // Cleanup stream when closing modal
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showCamera]);

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setAvatar(dataUrl);
        setShowCamera(false);
      }
    }
  };

  // Mock dynamic user status
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: avatar,
    type: "Buyer Account",
    isVerified: true,
    isTopRated: true,
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as any } }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-10">
      
      {/* Profile Header */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={sectionVariants}
        className="flex items-center gap-5 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-wrap sm:flex-nowrap"
      >
        <div className="relative shrink-0 group">
          <img 
            src={user.avatar} 
            alt="My Profile" 
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md transition-opacity group-hover:opacity-80"
          />
          <button 
            onClick={() => setShowCamera(true)}
            className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md border-2 border-white hover:bg-primary/90 transition-colors"
            title="Edit Profile Picture"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight truncate">{user.name}</h1>
          <p className="text-gray-500 text-sm mb-3 truncate">{user.email}</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide shrink-0">
              {user.type}
            </span>
            {user.isVerified && (
              <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide flex items-center gap-1 shrink-0">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
            {user.isTopRated && (
              <span className="bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wide flex items-center gap-1 shrink-0">
                <Star className="w-3 h-3 fill-current" /> Top Rated
              </span>
            )}
          </div>
        </div>
        <button className="hidden sm:block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors shrink-0">
          Edit Profile
        </button>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        
        {/* Account Settings */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">Account Settings</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <SettingsItem icon={UserCircle} label="Personal Information">
              <div className="space-y-4">
                <div className="text-sm">
                  <p className="text-gray-500 mb-1">Full Name</p>
                  <p className="font-medium text-gray-900">Alex Johnson</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500 mb-1">Email Address</p>
                  <p className="font-medium text-gray-900">alex.johnson@example.com</p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500 mb-1">Phone Number</p>
                  <p className="font-medium text-gray-900">+1 (555) 000-0000</p>
                </div>
                <button className="text-primary font-medium text-sm hover:underline">Edit Details</button>
              </div>
            </SettingsItem>
            <div className="h-px bg-gray-50 mx-4" />
            <SettingsItem icon={CreditCard} label="Payment Methods">
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-blue-900">VISA</div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">•••• 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/28</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Default</span>
                </div>
                <button className="w-full py-2 border-2 border-dashed border-gray-200 text-gray-600 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors">
                  + Add New Card
                </button>
              </div>
            </SettingsItem>
            <div className="h-px bg-gray-50 mx-4" />
            <SettingsItem icon={Bell} label="Notifications">
              <NotificationSettingsContent />
            </SettingsItem>
          </div>
        </motion.section>

        {/* Saved & Favorites */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">My Oja</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <SettingsItem icon={Heart} label="Saved Workers" badge="3">
              <div className="space-y-3">
                {['Sarah J. (Cleaning)', 'Mike T. (Plumbing)', 'Elena R. (Design)'].map((saved, i) => (
                  <div key={i} className="flex items-center justify-between text-sm py-1">
                    <span className="font-medium text-gray-900">{saved}</span>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                ))}
              </div>
            </SettingsItem>
          </div>
        </motion.section>

        {/* Preferences & Appearance */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">Appearance</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                  <Moon className="w-5 h-5 text-gray-600" />
                </div>
                <span className="font-medium text-gray-800 text-sm">Theme</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100">
              <button 
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'light' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Sun className="w-4 h-4" /> Light
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Moon className="w-4 h-4" /> Dark
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'system' ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Monitor className="w-4 h-4" /> System
              </button>
            </div>
          </div>
        </motion.section>

        {/* Support & Legal */}
        <motion.section variants={sectionVariants} initial="hidden" animate="visible">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">Support & Legal</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <SettingsItem icon={HelpCircle} label="Help Center">
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-primary transition-colors py-1">FAQ</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-primary transition-colors py-1">Contact Support</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-primary transition-colors py-1">Report an Issue</a>
              </div>
            </SettingsItem>
            <div className="h-px bg-gray-50 mx-4" />
            <SettingsItem icon={ShieldCheck} label="Trust & Safety">
              <div className="space-y-2 text-sm text-gray-600">
                <p>Learn about our Escrow protection and how we verify service providers.</p>
                <a href="#" className="text-primary font-medium hover:underline inline-block mt-1">Read Guidelines</a>
              </div>
            </SettingsItem>
            <div className="h-px bg-gray-50 mx-4" />
            <SettingsItem icon={Settings} label="Other Preferences">
              <div className="space-y-2">
                <a href="#" className="block text-sm text-gray-600 hover:text-primary transition-colors py-1">Language: English (US)</a>
                <a href="#" className="block text-sm text-gray-600 hover:text-primary transition-colors py-1">Currency: USD ($)</a>
              </div>
            </SettingsItem>
          </div>
        </motion.section>
        
        <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 font-bold py-4 rounded-2xl transition-colors">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
      
      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 p-4 rounded-3xl w-full max-w-md flex flex-col items-center shadow-2xl border border-zinc-800"
            >
              <div className="w-full flex justify-between items-center mb-4 px-2">
                <h3 className="text-white font-medium">Take a photo</h3>
                <button onClick={() => setShowCamera(false)} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black mb-6">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Camera overlay UI */}
                <div className="absolute inset-0 border-2 border-white/20 m-8 rounded-full pointer-events-none" />
              </div>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setShowCamera(false)}
                  className="flex-1 py-4 rounded-xl font-medium text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={takePhoto}
                  className="flex-1 py-4 rounded-xl font-medium text-zinc-900 bg-white hover:bg-gray-100 transition-colors flex justify-center items-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capture
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingsItem({ icon: Icon, label, badge, children }: { icon: any, label: string, badge?: string, children?: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  if (!children) {
    return (
      <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors active:bg-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <span className="font-medium text-gray-800 text-sm">{label}</span>
        </div>
        <div className="flex items-center gap-3">
          {badge && (
            <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </button>
    );
  }

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors active:bg-gray-100"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <span className="font-medium text-gray-800 text-sm">{label}</span>
        </div>
        <div className="flex items-center gap-3">
          {badge && (
            <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
          <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 bg-gray-50/50">
          <div className="pl-12 pr-2 pt-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationSettingsContent() {
  const [bookingUpdates, setBookingUpdates] = React.useState(true);
  const [chatMessages, setChatMessages] = React.useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Booking Updates</p>
          <p className="text-xs text-gray-500">Get notified about your booking status.</p>
        </div>
        <button 
          onClick={() => setBookingUpdates(!bookingUpdates)}
          className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${bookingUpdates ? 'bg-primary' : 'bg-gray-300'}`}
        >
          <span className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-transform ${bookingUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-900">Chat Messages</p>
          <p className="text-xs text-gray-500">Receive alerts for new messages.</p>
        </div>
        <button 
          onClick={() => setChatMessages(!chatMessages)}
          className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${chatMessages ? 'bg-primary' : 'bg-gray-300'}`}
        >
          <span className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-transform ${chatMessages ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  );
}
