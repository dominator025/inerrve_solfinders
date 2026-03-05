import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    change: number;
    icon: LucideIcon;
    color: string;
    index?: number;
}

export default function StatCard({ title, value, change, icon: Icon, color, index = 0 }: StatCardProps) {
    const isPositive = change >= 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-md border border-warm-beige/50 hover:shadow-lg transition-shadow"
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${isPositive ? 'bg-deep-green/10 text-deep-green' : 'bg-rust/10 text-rust'
                        }`}
                >
                    {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(change)}%
                </div>
            </div>
            <p className="text-2xl font-bold text-earth-brown">{typeof value === 'number' ? value.toLocaleString() : value}</p>
            <p className="text-sm text-earth-brown/50 mt-1">{title}</p>
        </motion.div>
    );
}
