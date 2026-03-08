import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, TrendingUp, Info } from 'lucide-react';
import { mockProducts } from '../utils/mockData';

interface AIPriceFairnessProps {
  category: string;
  price: string;
  materials: string;
}

interface MarketData {
  min: number;
  max: number;
  avg: number;
  count: number;
  prices: number[];
}

function getMarketData(category: string): MarketData | null {
  if (!category) return null;
  const catProducts = mockProducts.filter(p => p.category === category);
  if (catProducts.length === 0) return null;

  const prices = catProducts.map(p => p.price).sort((a, b) => a - b);
  const avg = Math.round(prices.reduce((s, p) => s + p, 0) / prices.length);
  return { min: prices[0], max: prices[prices.length - 1], avg, count: prices.length, prices };
}

type FairnessLevel = 'fair' | 'low' | 'too_low' | null;

function getFairnessLevel(price: number, market: MarketData): FairnessLevel {
  const fairThreshold = market.avg * 0.6;
  const lowThreshold = market.avg * 0.35;

  if (price >= fairThreshold) return 'fair';
  if (price >= lowThreshold) return 'low';
  return 'too_low';
}

const fairnessConfig = {
  fair: {
    color: 'bg-emerald-500',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    icon: ShieldCheck,
    label: 'Fair Price',
    message: 'Great! Your price fairly reflects your craftsmanship and effort.',
  },
  low: {
    color: 'bg-amber-400',
    border: 'border-amber-200',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    icon: AlertTriangle,
    label: 'Slightly Low',
    message: 'Your price is a bit below market average. Consider increasing it to better value your work.',
  },
  too_low: {
    color: 'bg-red-500',
    border: 'border-red-200',
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: AlertTriangle,
    label: 'Underpriced',
    message: '⚠️ This price may undervalue your work. Your craft deserves fair compensation.',
  },
};

export default function AIPriceFairness({ category, price, materials }: AIPriceFairnessProps) {
  const numPrice = Number(price) || 0;

  const market = useMemo(() => getMarketData(category), [category]);

  const fairness = useMemo(() => {
    if (!market || numPrice <= 0) return null;
    return getFairnessLevel(numPrice, market);
  }, [market, numPrice]);

  const suggestedRange = useMemo(() => {
    if (!market) return null;
    const materialsList = materials.split(',').map(m => m.trim()).filter(Boolean);
    const premiumKeywords = ['silk', 'gold', 'silver', 'pashmina', 'rosewood', 'teak', 'pure', 'sterling'];
    const hasPremium = materialsList.some(m => premiumKeywords.some(k => m.toLowerCase().includes(k)));

    const low = Math.round(market.avg * 0.65);
    const high = Math.round(market.avg * 1.4);
    const bump = hasPremium ? 1.25 : 1;

    return { low: Math.round(low * bump), high: Math.round(high * bump) };
  }, [market, materials]);

  if (!category) return null;

  const pricePosition = market && numPrice > 0
    ? Math.min(100, Math.max(0, ((numPrice - market.min) / (market.max - market.min || 1)) * 100))
    : null;

  const config = fairness ? fairnessConfig[fairness] : null;

  return (
    <AnimatePresence>
      {market && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="rounded-2xl border border-warm-beige/60 bg-cream/50 p-5 space-y-5">
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-br from-terracotta to-saffron text-white">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-earth-brown text-sm">AI Price Fairness Checker</h4>
                <p className="text-xs text-earth-brown/40">Powered by CraftConnect market data</p>
              </div>
            </div>

            {/* Suggested Range */}
            {suggestedRange && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-warm-beige/40">
                <div>
                  <p className="text-xs font-bold text-earth-brown/40 uppercase tracking-wider mb-0.5">Recommended Fair Price</p>
                  <p className="text-lg font-heading font-bold text-earth-brown">
                    ₹{suggestedRange.low.toLocaleString('en-IN')} — ₹{suggestedRange.high.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-earth-brown/40">Based on</p>
                  <p className="text-sm font-bold text-terracotta">{market.count} products</p>
                </div>
              </div>
            )}

            {/* Fairness Indicator */}
            <AnimatePresence mode="wait">
              {config && numPrice > 0 && (
                <motion.div
                  key={fairness}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`flex items-start gap-3 p-3.5 rounded-xl ${config.bg} ${config.border} border`}
                >
                  <config.icon className={`w-5 h-5 mt-0.5 ${config.text} shrink-0`} />
                  <div>
                    <span className={`text-sm font-bold ${config.text}`}>{config.label}</span>
                    <p className={`text-xs mt-0.5 ${config.text} opacity-80`}>{config.message}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Market Comparison Bar */}
            <div>
              <p className="text-xs font-bold text-earth-brown/40 uppercase tracking-wider mb-3">Category Market Range</p>
              <div className="relative h-3 rounded-full bg-warm-beige/40 overflow-hidden">
                {/* Gradient bar */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400 opacity-60" />

                {/* Average marker */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-earth-brown/60 rounded-full"
                  style={{ left: `${((market.avg - market.min) / (market.max - market.min || 1)) * 100}%` }}
                  title={`Average: ₹${market.avg}`}
                />

                {/* User price marker */}
                {pricePosition !== null && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md"
                    style={{
                      left: `${pricePosition}%`,
                      backgroundColor: fairness === 'fair' ? '#10b981' : fairness === 'low' ? '#f59e0b' : '#ef4444',
                    }}
                  />
                )}
              </div>

              {/* Labels */}
              <div className="flex justify-between mt-2 text-xs text-earth-brown/40">
                <span>₹{market.min.toLocaleString('en-IN')}</span>
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Avg ₹{market.avg.toLocaleString('en-IN')}
                </span>
                <span>₹{market.max.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
