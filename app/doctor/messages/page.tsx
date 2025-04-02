'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical, 
  Clock,
  Image,
  File,
  Mic,
  Smile,
  Download
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { format } from 'date-fns';

const DoctorLayout = dynamic(() => import('@/components/layout/DoctorLayout'), { ssr: false });

// Sample data for healthcare providers
const providers = [
  {
    id: 'p1',
    name: 'Juan Dela Cruz',
    specialty: 'Hypertension Management',
    avatar: '/images/avatars/patient-1.jpg',
    status: 'online',
    lastSeen: new Date(),
    unread: 2,
  },
  {
    id: 'p2',
    name: 'Maria Santos',
    specialty: 'Diabetes Check-up',
    avatar: '/images/avatars/patient-2.jpg',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unread: 0,
  },
  {
    id: 'p3',
    name: 'Pedro Reyes',
    specialty: 'Chest Pain Evaluation',
    avatar: '/images/avatars/patient-3.jpg',
    status: 'online',
    lastSeen: new Date(),
    unread: 0,
  },
  {
    id: 'p4',
    name: 'Ana Garcia',
    specialty: 'Prenatal Care',
    avatar: '/images/avatars/patient-4.jpg',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    unread: 0,
  },
  {
    id: 'p5',
    name: 'Jose Lim',
    specialty: 'Physical Therapy Follow-up',
    avatar: '/images/avatars/patient-5.jpg',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    unread: 0,
  },
];

// Sample messages for selected provider
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  attachment?: {
    type: 'image' | 'document' | 'prescription';
    filename: string;
    url: string;
  };
  read: boolean;
}

const conversations: Record<string, Message[]> = {
  p1: [
    {
      id: 'm1',
      senderId: 'p1',
      text: "Good morning, I've been monitoring my blood pressure as requested.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 60 * 3), // 2 days and 3 hours ago
      read: true,
    },
    {
      id: 'm2',
      senderId: 'user',
      text: 'Good morning. How are your readings looking?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 60 * 2), // 2 days and 2 hours ago
      read: true,
    },
    {
      id: 'm3',
      senderId: 'p1',
      text: 'My readings have been more stable lately. I\'m taking the medication as prescribed.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 60 * 1), // 2 days and 1 hour ago
      read: true,
    },
    {
      id: 'm4',
      senderId: 'p1',
      text: 'Here are my blood pressure logs for the past week.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 59), // 2 days and 59 minutes ago
      attachment: {
        type: 'document',
        filename: 'BP_Logs.pdf',
        url: '/documents/bp_logs.pdf',
      },
      read: true,
    },
    {
      id: 'm5',
      senderId: 'user',
      text: 'Thank you for sharing. The readings look better. Keep up the good work!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 50), // 2 days and 50 minutes ago
      read: true,
    },
    {
      id: 'm6',
      senderId: 'p1',
      text: 'Thank you! I\'ll continue monitoring and send updates next week.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 45), // 2 days and 45 minutes ago
      read: true,
    },
    {
      id: 'm7',
      senderId: 'user',
      text: 'Perfect. Take care!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 40), // 2 days and 40 minutes ago
      read: true,
    },
    {
      id: 'm8',
      senderId: 'p1',
      text: 'Hello, I have a quick question about my medication schedule.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: 'm9',
      senderId: 'p1',
      text: 'I found this article about hypertension management. Would you like to review it?',
      timestamp: new Date(Date.now() - 1000 * 60 * 28), // 28 minutes ago
      attachment: {
        type: 'document',
        filename: 'Hypertension_Article.pdf',
        url: '/documents/hypertension_article.pdf',
      },
      read: false,
    },
  ],
  p3: [
    {
      id: 'm1',
      senderId: 'p3',
      text: 'Hi, I\'ve been experiencing some chest discomfort since yesterday.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      read: true,
    },
    {
      id: 'm2',
      senderId: 'user',
      text: 'I\'m sorry to hear that. Can you describe the discomfort?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 30), // 5 days ago + 30 minutes
      read: true,
    },
    {
      id: 'm3',
      senderId: 'p3',
      text: 'It\'s a mild pressure in the center of my chest. I\'ve attached my recent ECG results.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 35), // 5 days ago + 35 minutes
      attachment: {
        type: 'document',
        filename: 'ECG_Results.pdf',
        url: '/documents/ecg_results.pdf',
      },
      read: true,
    },
    {
      id: 'm4',
      senderId: 'p3',
      text: 'I\'ve scheduled an appointment for tomorrow morning. Is that okay?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 40), // 5 days ago + 40 minutes
      read: true,
    },
  ],
};

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);
  const [messageText, setMessageText] = useState('');
  
  // Get messages for currently selected provider
  const messages = conversations[selectedProvider.id] || [];
  
  // Filter providers based on search query
  const filteredProviders = providers.filter(
    provider => 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, this would send the message to the backend
    // For now, just clear the input
    setMessageText('');
  };
  
  // Format time for display
  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return format(date, 'h:mm a');
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };
  
  return (
    <DoctorLayout title="Messages">
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          Securely communicate with patients. Send messages, share files, and get timely responses.
        </p>
      </div>
      
      <div className="h-[calc(100vh-220px)] min-h-[500px] flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Providers List */}
        <div className="w-full max-w-xs border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className={`p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    selectedProvider.id === provider.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                  }`}
                  onClick={() => setSelectedProvider(provider)}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <Avatar 
                        size="md" 
                        src={provider.avatar} 
                        alt={provider.name} 
                        fallback={provider.name.charAt(0)}
                      />
                      <span 
                        className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-gray-900 ${
                          provider.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                    </div>
                    <div className="ml-3 flex-1 overflow-hidden">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {provider.name}
                        </p>
                        {provider.unread > 0 && (
                          <Badge variant="primary" rounded>{provider.unread}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {provider.specialty}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        {provider.status === 'online' ? (
                          <span>Online now</span>
                        ) : (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Last seen {format(provider.lastSeen, 'h:mm a')}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800">
          {/* Chat Header */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-between items-center">
            <div className="flex items-center">
              <Avatar 
                size="md" 
                src={selectedProvider.avatar} 
                alt={selectedProvider.name} 
                fallback={selectedProvider.name.charAt(0)}
              />
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">{selectedProvider.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedProvider.specialty}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                <Phone size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                <Video size={20} />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const isUserMessage = message.senderId === 'user';
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex ${isUserMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!isUserMessage && (
                      <Avatar 
                        size="sm" 
                        src={selectedProvider.avatar} 
                        alt={selectedProvider.name} 
                        fallback={selectedProvider.name.charAt(0)}
                        className="mt-1"
                      />
                    )}
                    <div className={`${isUserMessage ? 'mr-2' : 'ml-2'} max-w-md`}>
                      <div 
                        className={`p-3 rounded-lg ${
                          isUserMessage 
                            ? 'bg-primary text-white rounded-br-none' 
                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.attachment && (
                          <div className="mt-2">
                            <div className="flex items-center p-2 bg-black/10 dark:bg-black/20 rounded">
                              {message.attachment.type === 'image' ? (
                                <Image size={16} className="mr-2" />
                              ) : (
                                <File size={16} className="mr-2" />
                              )}
                              <span className="text-xs truncate">{message.attachment.filename}</span>
                              <Button variant="ghost" size="icon" className="ml-auto p-1">
                                <Download size={14} />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div 
                        className={`mt-1 text-xs text-gray-500 flex items-center ${
                          isUserMessage ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {formatMessageTime(message.timestamp)}
                        {isUserMessage && (
                          <span className="ml-1">
                            {message.read ? 'Read' : 'Delivered'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Message Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                <Paperclip size={20} />
              </button>
              <div className="mx-2 flex-1">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <Mic size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                  <Smile size={20} />
                </button>
                <button 
                  className={`p-2 rounded-full ${
                    messageText.trim() 
                      ? 'bg-primary text-white hover:bg-primary-600' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}