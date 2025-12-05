import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Globe, Loader2, Bot, Search } from 'lucide-react';
import { streamAdvisorChat, searchMarketData } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: 'Welcome to Equity Freedom. I am your specialized AI concierge. Ask me about the 721 Exchange Fund structure, tax implications, or use the "Market Check" tab to analyze your specific stock holdings.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'advisor' | 'search'>('advisor');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (mode === 'advisor') {
        const history = messages
          .filter(m => !m.isSearch) // Filter out search results from chat history context
          .map(m => ({ role: m.role, parts: [{ text: m.content }] }));
        
        const streamResult = await streamAdvisorChat(history, userMsg.content);
        
        let fullResponse = "";
        const modelMsgIndex = messages.length + 1; // +1 for the user message we just added
        
        // Add placeholder for streaming
        setMessages(prev => [...prev, { role: 'model', content: '' }]);

        for await (const chunk of streamResult) {
            const chunkText = chunk.text;
            if (chunkText) {
                fullResponse += chunkText;
                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].content = fullResponse;
                    return newMsgs;
                });
            }
        }

      } else {
        // Search Mode
        const searchResult = await searchMarketData(userMsg.content);
        setMessages(prev => [...prev, { 
            role: 'model', 
            content: searchResult.text || '', 
            isSearch: true,
            groundingSources: searchResult.sources 
        }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: "I apologize, but I'm having trouble connecting to the secure server right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="concierge" className="py-24 bg-brand-slate border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-3xl font-serif text-white flex items-center gap-3">
                    <Sparkles className="text-brand-gold" />
                    AI Investment Concierge
                </h2>
                <p className="text-brand-light/60 mt-2">Powered by Gemini Pro & Google Search Grounding</p>
            </div>
            
            <div className="bg-brand-dark p-1 rounded-lg flex border border-white/10">
                <button 
                    onClick={() => setMode('advisor')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'advisor' ? 'bg-brand-gold text-brand-dark' : 'text-brand-light hover:text-white'}`}
                >
                    <Bot size={16} /> Advisor Chat
                </button>
                <button 
                    onClick={() => setMode('search')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${mode === 'search' ? 'bg-blue-600 text-white' : 'text-brand-light hover:text-white'}`}
                >
                    <Globe size={16} /> Market Check
                </button>
            </div>
        </div>

        <div className="bg-brand-dark rounded-xl border border-white/10 shadow-2xl h-[600px] flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-5 ${
                  msg.role === 'user' 
                    ? 'bg-brand-gold text-brand-dark rounded-tr-none' 
                    : 'bg-brand-slate border border-white/5 text-brand-light rounded-tl-none'
                }`}>
                    {msg.isSearch && (
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                            <Search size={12} />
                            Live Market Data
                        </div>
                    )}
                  <div className="prose prose-invert prose-sm">
                    {msg.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0">{line}</p>
                    ))}
                  </div>
                  
                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                          <p className="text-xs text-brand-light/40 mb-2">Sources:</p>
                          <div className="flex flex-wrap gap-2">
                              {msg.groundingSources.slice(0, 3).map((source, sIdx) => (
                                  <a key={sIdx} href={source.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline truncate max-w-[200px]">
                                      {source.title}
                                  </a>
                              ))}
                          </div>
                      </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-brand-slate border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                  <Loader2 className="animate-spin text-brand-gold" size={20} />
                  <span className="text-sm text-brand-light/60">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-brand-slate border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={mode === 'advisor' ? "Ask about the 721 Fund structure..." : "Ask about NVDA recent performance..."}
                className="w-full bg-brand-dark border border-white/10 rounded-lg pl-4 pr-12 py-4 text-white focus:border-brand-gold focus:outline-none placeholder-brand-light/30"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 p-2 bg-brand-gold text-brand-dark rounded-md hover:bg-brand-goldHover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-center text-xs text-brand-light/30 mt-3">
                AI can make mistakes. Please verify critical financial data. This is not official tax advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatBot;