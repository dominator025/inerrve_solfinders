import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Search, Globe, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';

interface VoiceAssistantProps {
    isOpen: boolean;
    onClose: () => void;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export default function VoiceAssistant({ isOpen, onClose }: VoiceAssistantProps) {
    const [transcript, setTranscript] = useState('');
    const [language, setLanguage] = useState('hi-IN');
    const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'success' | 'error'>('idle');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const recognitionRef = useRef<any>(null);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    }, []);

    const processCommand = useCallback((text: string) => {
        const lowerText = text.toLowerCase().trim();
        if (!lowerText) {
            setStatus('error');
            setFeedback("I didn't catch that.");
            setTimeout(() => setStatus('idle'), 2000);
            return;
        }

        setStatus('processing');

        // Logic for specialized section scrolling (Only on Home)
        const scrollTo = (id: string, message: string) => {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            } else {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }
            showSuccess(message);
        };

        const showSuccess = (message: string) => {
            setStatus('success');
            setFeedback(message);
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 1500);
        };

        // COMMAND MATCHING ENGINE
        // Navigation - Marketplace
        if (lowerText.includes('marketplace') || lowerText.includes('मार्केटप्लेस') || lowerText.includes('बाजार') || lowerText.includes('दुकान')) {
            navigate('/marketplace');
            showSuccess('Opening Marketplace...');
            return;
        }

        // Navigation - Home
        if (lowerText.includes('home') || lowerText.includes('होम') || lowerText.includes('शुरुआत') || lowerText.includes('main page')) {
            navigate('/');
            showSuccess('Going Home...');
            return;
        }

        // Navigation - Artisans
        if (lowerText.includes('artisan') || lowerText.includes('कलाकार') || lowerText.includes('profile')) {
            navigate('/artisans');
            showSuccess('Opening Artisan Profiles...');
            return;
        }

        // Section - Featured Products
        if (lowerText.includes('featured') || lowerText.includes('products section') || lowerText.includes('खास उत्पाद')) {
            scrollTo('products-section', 'Showing Featured Products...');
            return;
        }

        // Section - Categories
        if (lowerText.includes('category') || lowerText.includes('categories') || lowerText.includes('श्रेणियां')) {
            scrollTo('ai-tools-section', 'Viewing Categories & Tools...');
            return;
        }

        // Navigation - Skill Hub
        if (lowerText.includes('skill') || lowerText.includes('learning') || lowerText.includes('hub') || lowerText.includes('सीखना') || lowerText.includes('सिखाओ')) {
            navigate('/skill-growth');
            showSuccess('Opening Skill Growth Hub...');
            return;
        }

        // Search - Price filtering
        if (lowerText.includes('under') || lowerText.includes('below') || lowerText.includes('कम')) {
            const match = lowerText.match(/\d+/);
            if (match) {
                navigate(`/marketplace?maxPrice=${match[0]}`);
                showSuccess(`Showing products under ₹${match[0]}...`);
                return;
            }
        }

        // General Search
        const searchKeywords = ['show', 'find', 'search', 'दिखाओ', 'ढूंढो', 'खोजो', 'देखना'];
        let query = lowerText;
        let isSearch = false;

        searchKeywords.forEach(kw => {
            if (lowerText.includes(kw)) {
                isSearch = true;
                query = query.replace(kw, '');
            }
        });

        query = query.trim();
        if (isSearch || query.length > 2) {
            navigate(`/marketplace?search=${encodeURIComponent(query)}`);
            showSuccess(`Searching for "${query}"...`);
            return;
        }

        // Fallback
        setStatus('error');
        setFeedback("Unknown command. Try 'Open Marketplace' or 'Show Pottery'.");
        setTimeout(() => setStatus('idle'), 3000);
    }, [navigate, location.pathname, onClose]);

    const startListening = useCallback(() => {
        if (!SpeechRecognition) {
            alert('Voice recognition not supported. Use Chrome.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = language;
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onstart = () => {
            setStatus('listening');
            setTranscript('');
            setFeedback('');
        };

        recognition.onresult = (event: any) => {
            const currentTranscript = Array.from(event.results)
                .map((result: any) => result[0].transcript)
                .join('');
            setTranscript(currentTranscript);
        };

        recognition.onerror = (event: any) => {
            if (event.error !== 'no-speech') {
                console.error('STT Error:', event.error);
                setStatus('error');
                setFeedback('Something went wrong. Please try again.');
            } else {
                setStatus('idle');
            }
        };

        recognition.onend = () => {
            if (status === 'listening') {
                processCommand(transcript);
            }
        };

        recognition.start();
    }, [language, transcript, status, processCommand]);

    // Keyboard and Outside Click
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Auto-start listening when modal opens
            const timer = setTimeout(() => startListening(), 300);
            return () => {
                document.body.style.overflow = 'unset';
                clearTimeout(timer);
            };
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, startListening]);

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    {/* Glass Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { stopListening(); onClose(); }}
                        className="absolute inset-0 bg-earth-brown/40 backdrop-blur-3xl"
                    />

                    {/* Centered Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white/95 backdrop-blur-md rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] border border-white/40 overflow-hidden max-h-[90vh] flex flex-col pointer-events-auto"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-terracotta/20 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-saffron/20 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative p-6 sm:p-8 flex flex-col items-center overflow-y-auto custom-scrollbar">
                            {/* Close Button */}
                            <button 
                                onClick={() => { stopListening(); onClose(); }}
                                className="absolute top-6 right-6 p-2 h-10 w-10 bg-earth-brown/5 hover:bg-earth-brown/10 rounded-full flex items-center justify-center transition-colors"
                            >
                                <X className="w-5 h-5 text-earth-brown/40" />
                            </button>

                            {/* Status Icon & Label */}
                            <div className="mb-10 mt-4 h-24 flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    {status === 'listening' ? (
                                        <motion.div 
                                            key="mic"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 1.5, opacity: 0 }}
                                            className="relative"
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="absolute inset-0 bg-terracotta/20 rounded-full blur-xl"
                                            />
                                            <div className="relative w-20 h-20 bg-gradient-to-br from-terracotta to-saffron rounded-full flex items-center justify-center shadow-xl shadow-terracotta/20">
                                                <Mic className="w-8 h-8 text-white" />
                                            </div>
                                        </motion.div>
                                    ) : status === 'processing' ? (
                                        <motion.div 
                                            key="spinner"
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                            className="w-16 h-16 border-4 border-terracotta/20 border-t-terracotta rounded-full"
                                        />
                                    ) : status === 'success' ? (
                                        <motion.div 
                                            key="success"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-deep-green"
                                        >
                                            <CheckCircle2 className="w-20 h-20" />
                                        </motion.div>
                                    ) : status === 'error' ? (
                                        <motion.div 
                                            key="error"
                                            initial={{ x: [-10, 10, -10, 10, 0] }}
                                            transition={{ duration: 0.4 }}
                                            className="text-rust"
                                        >
                                            <AlertCircle className="w-20 h-20" />
                                        </motion.div>
                                    ) : (
                                        <div className="w-20 h-20 bg-warm-beige/30 rounded-full flex items-center justify-center">
                                            <Mic className="w-8 h-8 text-earth-brown/20" />
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Live Transcript */}
                            <div className="text-center space-y-3 mb-8 min-h-[5rem]">
                                <p className="text-sm font-bold text-terracotta tracking-widest uppercase">
                                    {status === 'listening' ? 'Listening...' : 
                                     status === 'processing' ? 'Processing...' :
                                     status === 'success' ? 'Command Recognized' :
                                     status === 'error' ? 'Oops!' : 'Ready'}
                                </p>
                                <h2 className="text-2xl font-heading font-bold text-earth-brown leading-tight">
                                    {transcript || feedback || 'Tell me what to do...'}
                                </h2>
                            </div>

                            {/* Visualizer (While Listening) */}
                            {status === 'listening' && (
                                <div className="flex gap-1.5 justify-center h-8 items-center mb-8">
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: transcript ? [4, 24, 4] : [4, 12, 4] }}
                                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                                            className="w-1.5 bg-gradient-to-t from-terracotta to-saffron rounded-full"
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Language & Suggestions */}
                            <div className="w-full space-y-6">
                                <div className="flex bg-warm-beige/30 p-1.5 rounded-2xl">
                                    <button 
                                        onClick={() => setLanguage('hi-IN')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
                                            language === 'hi-IN' ? 'bg-white text-earth-brown shadow-sm' : 'text-earth-brown/40'
                                        }`}
                                    >
                                        <Globe className="w-4 h-4" />
                                        Hindi
                                    </button>
                                    <button 
                                        onClick={() => setLanguage('en-US')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
                                            language === 'en-US' ? 'bg-white text-earth-brown shadow-sm' : 'text-earth-brown/40'
                                        }`}
                                    >
                                        <Globe className="w-4 h-4" />
                                        English
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { label: 'Explore Marketplace', icon: Search, cmd: 'Open marketplace' },
                                        { label: 'Categories', icon: Sparkles, cmd: 'Go to categories' },
                                        { label: 'Pottery Items', icon: Search, cmd: 'पॉटरी दिखाओ' }
                                    ].map((opt) => (
                                        <button
                                            key={opt.label}
                                            onClick={() => processCommand(opt.cmd)}
                                            className="flex items-center gap-3 p-3 text-left bg-gradient-to-r from-warm-beige/10 to-transparent hover:from-warm-beige/30 rounded-2xl transition-all group"
                                        >
                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                <opt.icon className="w-4 h-4 text-terracotta" />
                                            </div>
                                            <span className="text-sm font-medium text-earth-brown/60 group-hover:text-earth-brown transition-colors">
                                                {opt.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
}
