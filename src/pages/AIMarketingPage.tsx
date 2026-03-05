import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import { SOCIAL_PLATFORMS, CRAFT_CATEGORIES } from '../utils/constants';
import { generateMarketingCaption } from '../ai/marketingGenerator';
import { mockProducts } from '../utils/mockData';

export default function AIMarketingPage() {
    const [productName, setProductName] = useState('');
    const [craftType, setCraftType] = useState('');
    const [platform, setPlatform] = useState('instagram');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<{ caption: string; hashtags: string[]; callToAction: string } | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!productName || !craftType) return;
        setIsGenerating(true);
        try {
            const output = await generateMarketingCaption({ productName, craftType, platform });
            setResult(output);
        } catch (error) {
            console.error('Generation failed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        if (!result) return;
        const fullText = `${result.caption}\n\n${result.hashtags.join(' ')}\n\n${result.callToAction}`;
        navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-deep-green/10 text-deep-green text-sm font-semibold rounded-full mb-4">
                        <Megaphone className="w-4 h-4" />
                        AI Marketing
                    </span>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-3">
                        Marketing Assistant
                    </h1>
                    <p className="text-earth-brown/60 max-w-2xl mx-auto">
                        Generate platform-specific marketing captions, hashtags, and calls-to-action for your handmade products.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-warm-beige/50"
                    >
                        <h2 className="font-heading text-xl font-semibold text-earth-brown mb-6">
                            Create Marketing Content
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Product Name *</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="e.g., Blue Pottery Vase"
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                                />
                            </div>

                            {/* Quick select from existing products */}
                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Or select a product</label>
                                <select
                                    onChange={(e) => {
                                        const p = mockProducts.find((prod) => prod.id === e.target.value);
                                        if (p) {
                                            setProductName(p.name);
                                            setCraftType(p.category);
                                        }
                                    }}
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown transition-all"
                                >
                                    <option value="">Select existing product</option>
                                    {mockProducts.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Craft Type *</label>
                                <select
                                    value={craftType}
                                    onChange={(e) => setCraftType(e.target.value)}
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown transition-all"
                                >
                                    <option value="">Select craft type</option>
                                    {CRAFT_CATEGORIES.map((c) => (
                                        <option key={c.id} value={c.label}>{c.icon} {c.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-3">Platform *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {SOCIAL_PLATFORMS.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => setPlatform(p.id)}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${platform === p.id
                                                    ? 'bg-terracotta/10 border-terracotta text-terracotta'
                                                    : 'bg-warm-beige/20 border-warm-beige text-earth-brown/60 hover:border-terracotta/30'
                                                }`}
                                        >
                                            <span className="text-lg">{p.icon}</span>
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={!productName || !craftType || isGenerating}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-deep-green to-deep-green-light text-white rounded-xl font-semibold shadow-lg shadow-deep-green/20 hover:shadow-deep-green/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Generate Caption
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Output */}
                    <AnimatePresence mode="wait">
                        {isGenerating ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="bg-white rounded-2xl p-12 shadow-lg border border-warm-beige/50 flex flex-col items-center justify-center"
                            >
                                <Loader2 className="w-12 h-12 text-terracotta animate-spin mb-4" />
                                <h3 className="font-heading text-lg font-semibold text-earth-brown">Creating your marketing post...</h3>
                            </motion.div>
                        ) : result ? (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-warm-beige/50"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-heading text-xl font-semibold text-earth-brown">
                                        {SOCIAL_PLATFORMS.find((p) => p.id === platform)?.icon}{' '}
                                        {SOCIAL_PLATFORMS.find((p) => p.id === platform)?.label} Post
                                    </h3>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-terracotta/10 text-terracotta rounded-xl hover:bg-terracotta/20 transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        {copied ? 'Copied!' : 'Copy All'}
                                    </button>
                                </div>

                                {/* Caption */}
                                <div className="bg-warm-beige/20 rounded-xl p-5 mb-5">
                                    <p className="text-earth-brown/80 whitespace-pre-line leading-relaxed">
                                        {result.caption}
                                    </p>
                                </div>

                                {/* Hashtags */}
                                {result.hashtags.length > 0 && (
                                    <div className="mb-5">
                                        <h4 className="text-sm font-semibold text-earth-brown mb-2">Hashtags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.hashtags.map((tag) => (
                                                <span key={tag} className="px-3 py-1.5 bg-terracotta/10 text-terracotta text-sm rounded-lg font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA */}
                                <div className="bg-gradient-to-r from-terracotta/10 to-saffron/10 rounded-xl p-4">
                                    <h4 className="text-sm font-semibold text-earth-brown mb-1">Call to Action</h4>
                                    <p className="text-earth-brown/80 font-medium">{result.callToAction}</p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-2xl p-12 shadow-lg border border-warm-beige/50 text-center flex flex-col items-center justify-center"
                            >
                                <div className="text-5xl mb-4">📢</div>
                                <h3 className="font-heading text-xl font-semibold text-earth-brown mb-2">
                                    Your Marketing Content
                                </h3>
                                <p className="text-sm text-earth-brown/50 max-w-sm">
                                    Select a product, craft type, and platform, then generate AI-powered marketing content.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
