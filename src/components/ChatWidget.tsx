import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Chào quý khách! Tôi là chuyên gia tư vấn của Tam Tửu. Quý khách cần tư vấn về loại rượu nào ạ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => `${m.role === 'user' ? 'Khách' : 'Bot'}: ${m.text}`);
    const response = await generateChatResponse(userMsg, history);

    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-wood-900 p-4 flex justify-between items-center text-gold-400">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-bold">Tư Vấn Viên AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-stone-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-wood-800 text-white rounded-br-none' 
                    : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 p-3 rounded-lg rounded-bl-none shadow-sm">
                  <Loader2 className="w-5 h-5 animate-spin text-wood-800" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-stone-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập câu hỏi..."
              className="flex-1 border border-stone-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-wood-800"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-wood-900 text-gold-400 p-2 rounded hover:bg-wood-800 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`shadow-xl shadow-wood-900/30 flex items-center gap-2 px-6 py-4 rounded-full font-bold transition-all transform hover:scale-105 ${
          isOpen ? 'bg-wood-800 text-white' : 'bg-gradient-to-r from-red-800 to-red-700 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span>Chat Tư Vấn</span>}
      </button>
    </div>
  );
};

export default ChatWidget;