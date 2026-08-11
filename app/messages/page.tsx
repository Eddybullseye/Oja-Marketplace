'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, ShieldAlert, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: number;
  sender: 'user' | 'provider';
  text: string;
  timestamp: string;
  isEscrowSystem?: boolean;
}

interface Thread {
  id: number;
  name: string;
  profession: string;
  image: string;
  online: boolean;
  messages: Message[];
  unread: boolean;
}

const INITIAL_THREADS: Thread[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    profession: 'Home Cleaner',
    image: 'https://picsum.photos/seed/sarah/100/100',
    online: true,
    unread: true,
    messages: [
      { id: 1, sender: 'provider', text: "Hello! I saw your booking request for house deep cleaning on Friday. Does 10:00 AM work well for you?", timestamp: '9:30 AM' },
      { id: 2, sender: 'user', text: "Yes, 10:00 AM is perfect! Please make sure to bring eco-friendly products as discussed in your profile.", timestamp: '9:32 AM' },
      { id: 3, sender: 'provider', text: "Absolutely, I bring all green supplies. I have locked down this slot in my schedule.", timestamp: '9:33 AM' },
      { id: 4, sender: 'provider', text: "Checking if there is any specific entry instructions?", timestamp: '9:34 AM', isEscrowSystem: false }
    ]
  },
  {
    id: 2,
    name: 'Marcus Chen',
    profession: 'Plumber',
    image: 'https://picsum.photos/seed/marcus/100/100',
    online: false,
    unread: false,
    messages: [
      { id: 1, sender: 'user', text: "Hi Marcus, are you available for emergency kitchen pipe leak fixer today?", timestamp: 'Yesterday' },
      { id: 2, sender: 'provider', text: "Yes, I can head over around 4:30 PM. My dynamic escrow fee is $85/hr.", timestamp: 'Yesterday' },
      { id: 3, sender: 'user', text: "Sounds good, I booked you through Oja Escrow. The funds are held safely.", timestamp: 'Yesterday' },
      { id: 4, sender: 'provider', text: "Perfect. I see the escrow hold confirmation. Heading over now.", timestamp: 'Yesterday' }
    ]
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    profession: 'Electrician',
    image: 'https://picsum.photos/seed/elena/100/100',
    online: true,
    unread: false,
    messages: [
      { id: 1, sender: 'provider', text: "Electric setup is all complete and tested. Let me know if you would like me to show you the panel setup.", timestamp: 'Aug 5' },
      { id: 2, sender: 'user', text: "Looks great, thanks Elena! I have authorized and released the funds from escrow.", timestamp: 'Aug 5' },
      { id: 3, sender: 'provider', text: "Received! Thank you for choosing me. Let me know if you need anything else.", timestamp: 'Aug 5' }
    ]
  }
];

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<number>(1);
  const [inputText, setInputText] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThread?.messages]);

  const handleThreadSelect = (id: number) => {
    setActiveThreadId(id);
    setThreads(prev => prev.map(t => t.id === id ? { ...t, unread: false } : t));
    setMobileView('chat');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));

    setInputText('');

    // Mock automatic provider response for demo purposes
    const threadId = activeThreadId;
    setTimeout(() => {
      setThreads(prev => prev.map(t => {
        if (t.id === threadId) {
          const autoMessage: Message = {
            id: Date.now() + 1,
            sender: 'provider',
            text: `Thanks for the updates! Looking forward to helping you with this.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          return {
            ...t,
            messages: [...t.messages, autoMessage]
          };
        }
        return t;
      }));
    }, 1500);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)]">
      {/* Header hidden on mobile if in chat details to maximize viewport */}
      <div className={`mb-4 ${mobileView === 'chat' ? 'hidden md:block' : ''}`}>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Messages</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">Secure discussions with escrow-linked professionals.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex-1 flex overflow-hidden shadow-sm">
        {/* Left Column - Threads */}
        <div className={`w-full md:w-80 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0 ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-3 text-sm">Chats</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-zinc-55 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 px-3 text-xs text-zinc-900 dark:text-zinc-50 outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-200 dark:divide-zinc-800">
            {threads.map((t) => {
              const lastMsg = t.messages[t.messages.length - 1];
              return (
                <button
                  key={t.id}
                  onClick={() => handleThreadSelect(t.id)}
                  className={`w-full text-left p-4 hover:bg-zinc-55 dark:hover:bg-zinc-850/50 flex gap-3 transition-colors ${t.id === activeThreadId ? 'bg-zinc-50 dark:bg-zinc-800/30' : ''
                    }`}
                >
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 bg-zinc-100">
                    <Image src={t.image} alt={t.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    {t.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 truncate flex items-center gap-1.5">
                        {t.name}
                        {t.unread && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                      </h4>
                      <span className="text-[10px] text-zinc-400">{lastMsg ? lastMsg.timestamp : ''}</span>
                    </div>
                    <p className="text-xs text-zinc-505 dark:text-zinc-400 font-medium truncate">{t.profession}</p>
                    <p className={`text-xs mt-1 truncate ${t.unread ? 'font-semibold text-zinc-850 dark:text-zinc-200' : 'text-zinc-450 dark:text-zinc-500'}`}>
                      {lastMsg ? lastMsg.text : ''}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column - Chat Details */}
        <div className={`flex-1 flex flex-col bg-zinc-50/50 dark:bg-zinc-950/20 ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
          {/* Active Header */}
          <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileView('list')}
                className="md:hidden text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 bg-zinc-100">
                <Image src={activeThread.image} alt={activeThread.name} fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-50">{activeThread.name}</h4>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-450 font-medium">Verified Active Service Contract</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 px-3 py-1.5 rounded-full font-semibold">
              <CheckCircle className="w-3.5 h-3.5" /> Escrow Secure
            </div>
          </div>

          {/* Secure Escrow Notice banner */}
          <div className="bg-amber-50 dark:bg-amber-950/25 border-b border-amber-100 dark:border-amber-950/50 p-2.5 px-4 flex gap-2 text-[11px] text-amber-800 dark:text-amber-400 items-center shrink-0">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <p className="leading-relaxed">Keep payments & communication on-platform to protect your funds via Oja Escrow Safeguard.</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeThread.messages.map((msg) => {
              if (msg.isEscrowSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <div className="bg-zinc-100 dark:bg-zinc-800 text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" /> {msg.text}
                    </div>
                  </div>
                );
              }

              const isUser = msg.sender === 'user';
              return (
                <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl p-3 px-4 text-sm shadow-sm ${isUser
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded-tr-none'
                      : 'bg-white text-zinc-850 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-tl-none'
                    }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span className="block text-[9px] text-right mt-1 opacity-70">{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex gap-2 shrink-0">
            <input
              type="text"
              placeholder={`Send message to ${activeThread.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary/50 placeholder-zinc-400"
            />
            <button
              type="submit"
              className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 w-11 h-11 rounded-xl flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

