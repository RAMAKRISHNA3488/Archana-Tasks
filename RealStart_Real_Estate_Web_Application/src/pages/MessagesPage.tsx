import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Conversation, Message } from '../types';
import { Input } from '../components/ui/Input';
import { Search, Send, Phone, Video, MoreHorizontal, Paperclip, Smile } from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputContent, setInputContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getConversations().then((res) => {
      setConversations(res);
      if (res.length > 0) {
        setActiveConvId(res[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (activeConvId) {
      api.getMessages(activeConvId).then((res) => setMessages(res));
    }
  }, [activeConvId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeConv = conversations.find((c) => c.id === activeConvId);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim() || !activeConvId) return;

    const currentText = inputContent;
    setInputContent('');

    const { userMsg, agentReply } = await api.sendMessage(
      activeConvId,
      currentText,
      user?.id || 'usr_001'
    );

    setMessages((prev) => [...prev, userMsg]);

    // Refresh conversation list to update last message
    api.getConversations().then((res) => setConversations(res));

    if (agentReply) {
      setTimeout(() => {
        setMessages((prev) => [...prev, agentReply]);
        api.getConversations().then((res) => setConversations(res));
      }, 1000);
    }
  };

  const filteredConversations = conversations.filter((c) =>
    c.agentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Messages</h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Communicate with agents and property managers in real-time.
        </p>
      </div>

      {/* Split Layout Container matching Reference Screen 8 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Conversations Panel */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200/80 bg-white">
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                    isActive ? 'bg-brand-50/80 border-l-4 border-brand-600' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.agentAvatar}
                      alt={conv.agentName}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-white"
                    />
                    {conv.agentStatus === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{conv.agentName}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Panel matching Reference Screen 8 */}
        <div className="lg:col-span-8 flex flex-col bg-white">
          {activeConv ? (
            <>
              {/* Active Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={activeConv.agentAvatar}
                      alt={activeConv.agentName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {activeConv.agentStatus === 'online' && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{activeConv.agentName}</h3>
                    <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                      ● {activeConv.agentStatus === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <button className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message Transcript */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/40 custom-scrollbar">
                {messages.map((msg) => {
                  const isUser = msg.senderId === (user?.id || 'usr_001');

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          isUser
                            ? 'bg-brand-600 text-white rounded-br-none'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium mt-1 px-1">
                        {msg.createdAt}
                      </span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Box matching Screen 8 */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-brand-500 focus-within:bg-white transition-all">
                  <button
                    type="button"
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputContent}
                    onChange={(e) => setInputContent(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-slate-800 outline-none px-2"
                  />

                  <button
                    type="button"
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Smile className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
              Select a conversation to start messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
