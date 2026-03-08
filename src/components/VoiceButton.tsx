import { useState } from 'react';
import { Mic } from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';
import { motion } from 'framer-motion';

interface VoiceButtonProps {
    variant?: 'floating' | 'inline';
}

export default function VoiceButton({ variant = 'inline' }: VoiceButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (variant === 'floating') {
        return (
            <>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                    className="fixed bottom-8 right-8 z-40 w-16 h-16 bg-gradient-to-br from-terracotta to-saffron text-white rounded-full shadow-2xl flex items-center justify-center group pointer-events-auto"
                >
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity animate-ping-slow" />
                    <Mic className="w-8 h-8 relative z-10" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-deep-green rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">
                        AI
                    </div>
                </motion.button>
                <VoiceAssistant isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-saffron/10 text-saffron-dark rounded-xl font-semibold hover:bg-saffron/20 transition-all border border-saffron/20"
            >
                <Mic className="w-4 h-4" />
                <span>Voice Search</span>
                <span className="px-1.5 py-0.5 bg-saffron text-white text-[10px] rounded-md font-bold uppercase tracking-tight">AI</span>
            </button>
            <VoiceAssistant isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
