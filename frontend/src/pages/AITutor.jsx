import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, Target, Trash2 } from 'lucide-react';
import api from '../lib/api';
import './AITutor.css';

export default function AITutor() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);

    // Initialize welcome message only once after user loads
    useEffect(() => {
        if (messages.length === 0 && user) {
            setMessages([{
                id: 'init',
                role: 'assistant',
                text: `Hi ${user.name.split(' ')[0]}! I'm NEXUS, your AI Study Coach. I've analyzed your Error DNA and I'm ready to help you reach your target score. What would you like to master today?`,
                timestamp: new Date().toISOString()
            }]);
        }
    }, [user, messages.length]);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');

        const newMsgId = Date.now().toString();
        setMessages(prev => [...prev, {
            id: newMsgId,
            role: 'user',
            text: userMsg,
            timestamp: new Date().toISOString()
        }]);

        setIsLoading(true);

        try {
            const res = await api.post('/chat', {
                message: userMsg,
                context: messages.concat({ role: 'user', text: userMsg }).slice(-6)
            });

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: res.data.data.reply,
                timestamp: res.data.data.timestamp
            }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: 'I encountered a brief connection sync issue. Let me try again if you send your message once more.',
                isError: true,
                timestamp: new Date().toISOString()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestion = (text) => {
        setInput(text);
    };

    const handleClearChat = () => {
        if (window.confirm("Are you sure you want to end this session and clear the chat?")) {
            setMessages([{
                id: Date.now().toString(),
                role: 'assistant',
                text: `Session reset. What's our next target, ${user?.name?.split(' ')[0] || 'there'}?`,
                timestamp: new Date().toISOString()
            }]);
        }
    };

    const SUGGESTIONS = [
        "How can I improve my 1D Kinematics accuracy? 🏹",
        "Generate a practice question for Ionic Equilibrium ⚖️",
        "Explain the Bohr Model of the Atom ⚛️",
        "Am I ready for a full mock test? 📈",
    ];

    return (
        <div className="tutor-container">
            <div className="chat-window card">
                {/* Chat Header */}
                <header className="chat-header">
                    <div className="tutor-info">
                        <div className="tutor-avatar-main">
                            <Bot size={22} />
                        </div>
                        <div className="tutor-status">
                            <span className="name">NEXUS AI Coach</span>
                            <span className="online">
                                <span className="online-dot"></span>
                                Personalized for your Error DNA
                            </span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div className="badge badge-primary">
                            <Sparkles size={12} style={{ marginRight: '4px' }} /> Gemini Powered
                        </div>
                        <button onClick={handleClearChat} className="btn-icon" title="Clear Chat" style={{ background: 'transparent', border: 'none', color: 'var(--text-3)', cursor: 'pointer' }}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                </header>

                {/* Messages */}
                <div className="messages-list">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className={`message-node ${msg.role === 'assistant' ? 'bot' : 'user'}`}
                            >
                                <div className={`msg-avatar ${msg.role === 'assistant' ? 'bot' : 'user'}`}>
                                    {msg.role === 'assistant' ? <Target size={16} color="var(--brand-1)" /> : <User size={16} color="white" />}
                                </div>
                                <div className="bubble">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: msg.text
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/`(.*?)`/g, '<code>$1</code>')
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="message-node bot"
                        >
                            <div className="msg-avatar bot">
                                <Target size={16} color="var(--brand-1)" />
                            </div>
                            <div className="bubble">
                                <div className="typing-dots">
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                    <div className="dot"></div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Controls */}
                <div className="chat-input-wrapper">
                    {messages.length < 3 && (
                        <div className="suggestions-grid">
                            {SUGGESTIONS.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSuggestion(s.split(' ').slice(0, -1).join(' '))}
                                    className="suggestion-btn"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    <form onSubmit={handleSend} className="input-container">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isLoading ? "NEXUS is thinking..." : "Message your AI Coach..."}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="send-btn"
                            disabled={!input.trim() || isLoading}
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                        </button>
                    </form>
                    <p className="disclaimer">AI can provide incorrect info. Master the basics first.</p>
                </div>
            </div>
        </div>
    );
}
