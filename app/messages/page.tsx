/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, MoreVertical, Send, CheckCircle2, ChevronLeft, Paperclip, Mic, Image as ImageIcon, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CONVERSATIONS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    avatar: 'https://picsum.photos/seed/worker1/100/100',
    lastMessage: 'I will be there in 10 minutes!',
    time: '08:45 AM',
    unread: 2,
    verified: true,
  },
  {
    id: 2,
    name: 'David Okafor',
    avatar: 'https://picsum.photos/seed/worker2/100/100',
    lastMessage: 'Thank you for your business.',
    time: 'Yesterday',
    unread: 0,
    verified: true,
  },
  {
    id: 3,
    name: 'Support Team',
    avatar: 'https://picsum.photos/seed/support/100/100',
    lastMessage: 'Your refund has been processed.',
    time: 'Oct 10',
    unread: 0,
    verified: false,
  }
];

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
  isAudio?: boolean;
  imageUrl?: string;
};

const INITIAL_MESSAGES: Record<number, Message[]> = {
  1: [
    { id: 1, text: "Hi! I'm on my way. I should be there in about 10 minutes.", sender: 'other', time: '08:45 AM' },
    { id: 2, text: "Great, see you soon! I'll leave the gate unlocked.", sender: 'me', time: '08:47 AM' },
  ],
  2: [
    { id: 1, text: "Thank you for your business.", sender: 'other', time: 'Yesterday' }
  ],
  3: [
    { id: 1, text: "Your refund has been processed.", sender: 'other', time: 'Oct 10' }
  ]
};

export default function MessagesPage() {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeChat = CONVERSATIONS.find(c => c.id === activeChatId);
  const currentMessages = useMemo(() => activeChatId ? messages[activeChatId] || [] : [], [activeChatId, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !activeChatId) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMessage]
    }));
    setInputValue('');

    // Simulate reply
    setIsTyping(true);
    setTimeout(() => {
      const replyMessage: Message = {
        id: Date.now() + 1,
        text: "Got it! Thanks.",
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), replyMessage]
      }));
      setIsTyping(false);
    }, 2000);
  };

  const handleVoiceMail = () => {
    if (!activeChatId) return;
    if (isRecording) {
      setIsRecording(false);
      const audioMessage: Message = {
        id: Date.now(),
        text: "Voice message (0:04)",
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAudio: true
      };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), audioMessage]
      }));
    } else {
      setIsRecording(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeChatId) {
      const imageUrl = URL.createObjectURL(file);
      const fileMessage: Message = {
        id: Date.now(),
        text: '',
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        imageUrl
      };
      setMessages(prev => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), fileMessage]
      }));
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-64px)] md:h-[calc(100vh-72px)] bg-surface-light overflow-hidden">
      
      {/* Sidebar - Conversations List */}
      <div className={`w-full md:w-80 lg:w-96 flex flex-col bg-white border-r border-gray-100 shadow-sm z-10 ${activeChatId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="flex items-center bg-gray-100 rounded-full h-10 px-3">
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input 
              type="text" 
              placeholder="Search messages"
              className="bg-transparent border-none outline-none text-sm w-full px-2 text-gray-700"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {CONVERSATIONS.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChatId(chat.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 ${activeChatId === chat.id ? 'bg-primary/5' : ''} ${chat.unread && activeChatId !== chat.id ? 'bg-primary/5' : ''}`}
            >
              <div className="relative shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                {chat.verified && (
                  <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
                    <CheckCircle2 className="w-4 h-4 text-secondary fill-current" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className={`truncate text-sm ${chat.unread && activeChatId !== chat.id ? 'font-bold text-gray-900' : 'font-medium text-gray-800'}`}>
                    {chat.name}
                  </h3>
                  <span className={`text-[10px] shrink-0 ${chat.unread && activeChatId !== chat.id ? 'text-primary font-bold' : 'text-gray-400'}`}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className={`truncate text-xs ${chat.unread && activeChatId !== chat.id ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                    {activeChatId === chat.id && currentMessages.length > 0 ? currentMessages[currentMessages.length - 1].text : chat.lastMessage}
                  </p>
                  {chat.unread > 0 && activeChatId !== chat.id && (
                    <div className="w-4 h-4 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeChatId && activeChat ? (
        <div className={`flex-1 flex-col bg-surface-light relative flex`}>
          {/* Chat Header */}
          <div className="h-16 px-4 md:px-6 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm z-10 shrink-0">
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full"
                onClick={() => setActiveChatId(null)}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="relative shrink-0">
                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{activeChat.name}</h3>
                <p className="text-xs text-green-600 font-medium">Online</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
             <div className="flex flex-col items-center mb-6">
               <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Today</span>
             </div>

             {currentMessages.map((msg) => (
               <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                 {msg.sender === 'other' && (
                   <img src={activeChat.avatar} alt={activeChat.name} className="w-8 h-8 rounded-full object-cover mb-1 shrink-0" />
                 )}
                 <div className={`p-3 rounded-2xl max-w-[85%] md:max-w-md shadow-sm ${
                   msg.sender === 'me' 
                     ? 'bg-primary text-white rounded-br-sm' 
                     : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'
                 }`}>
                   {msg.imageUrl ? (
                     <div 
                       className="cursor-pointer overflow-hidden rounded-lg mb-1"
                       onClick={() => setSelectedImage(msg.imageUrl!)}
                     >
                       <img src={msg.imageUrl} alt="Uploaded file" className="max-w-full h-auto object-cover rounded-lg hover:opacity-90 transition-opacity" />
                     </div>
                   ) : msg.isAudio ? (
                     <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                         <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
                       </div>
                       <div className="flex-1 h-2 flex items-center gap-0.5">
                         {[1, 2, 3, 2, 1, 4, 2, 1, 3, 2].map((h, i) => (
                           <div key={i} className="w-1 bg-white/60 rounded-full" style={{ height: `${h * 4}px` }} />
                         ))}
                       </div>
                       <span className="text-xs font-medium ml-2 text-white/90">0:04</span>
                     </div>
                   ) : (
                     <p className="text-sm">{msg.text}</p>
                   )}
                   <span className={`text-[10px] mt-1 block ${msg.sender === 'me' ? 'text-primary-200 text-right' : 'text-gray-400'}`}>
                     {msg.time}
                   </span>
                 </div>
               </div>
             ))}

             {isTyping && (
               <div className="flex items-end gap-2">
                 <img src={activeChat.avatar} alt={activeChat.name} className="w-8 h-8 rounded-full object-cover mb-1 shrink-0" />
                 <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5 h-10 px-4">
                   <motion.div 
                     animate={{ y: [0, -5, 0] }}
                     transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                     className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                   />
                   <motion.div 
                     animate={{ y: [0, -5, 0] }}
                     transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                     className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                   />
                   <motion.div 
                     animate={{ y: [0, -5, 0] }}
                     transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                     className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                   />
                 </div>
               </div>
             )}

             <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-3 md:p-4 bg-white border-t border-gray-100 shrink-0 pb-safe">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-4xl mx-auto">
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors shrink-0"
              >
                <ImageIcon className="w-5 h-5" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
              />
              
              <div className="flex-1 flex items-center bg-gray-100 rounded-full h-10 md:h-12 px-4 shadow-inner">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                />
              </div>

              {inputValue.trim() ? (
                <button 
                  type="submit"
                  className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 hover:bg-primary-dark transition-colors shadow-sm active:scale-95"
                >
                  <Send className="w-5 h-5 ml-1" />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={handleVoiceMail}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm active:scale-95 ${
                    isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-surface-light">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto mb-4 text-gray-300">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Your Messages</h3>
            <p className="text-sm text-gray-500 max-w-xs">Select a conversation from the sidebar to view messages.</p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Full screen" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
