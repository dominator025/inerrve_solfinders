import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, BookOpen, FileText, Hash, Loader2 } from 'lucide-react';
import { CRAFT_CATEGORIES, INDIAN_STATES } from '../utils/constants';
import { generateCraftStory } from '../ai/storyGenerator';

export default function AIStoryGeneratorPage() {
    const [craftType, setCraftType] = useState('');
    const [location, setLocation] = useState('');
    const [materials, setMaterials] = useState('');
    const [inspiration, setInspiration] = useState('');
    const [artisanName, setArtisanName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<{ story: string; productDescription: string; marketingCaption: string } | null>(null);
    const [copied, setCopied] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!craftType || !location) return;
        setIsGenerating(true);
        try {
            const output = await generateCraftStory({ craftType, location, materials, inspiration, artisanName });
            setResult(output);
        } catch (error) {
            console.error('Generation failed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
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
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-semibold rounded-full mb-4">
                        <Sparkles className="w-4 h-4" />
                        AI-Powered Tools
                    </span>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-3">
                        AI Story Generator
                    </h1>
                    <p className="text-earth-brown/60 max-w-2xl mx-auto">
                        Transform simple details about your craft into compelling stories, product descriptions, and marketing captions powered by Google AI.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-warm-beige/50"
                    >
                        <h2 className="font-heading text-xl font-semibold text-earth-brown mb-6">
                            Tell us about your craft
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Your Name (optional)</label>
                                <input
                                    type="text"
                                    value={artisanName}
                                    onChange={(e) => setArtisanName(e.target.value)}
                                    placeholder="e.g., Lakshmi Devi"
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Craft Type *</label>
                                <select
                                    value={craftType}
                                    onChange={(e) => setCraftType(e.target.value)}
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown transition-all"
                                >
                                    <option value="">Select your craft type</option>
                                    {CRAFT_CATEGORIES.map((c) => (
                                        <option key={c.id} value={c.label}>{c.icon} {c.label}</option>
                                    ))}
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Location / Region *</label>
                                <select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown transition-all"
                                >
                                    <option value="">Select your region</option>
                                    {INDIAN_STATES.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Materials Used</label>
                                <input
                                    type="text"
                                    value={materials}
                                    onChange={(e) => setMaterials(e.target.value)}
                                    placeholder="e.g., Clay, natural dyes, quartz powder"
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Inspiration / Special Details</label>
                                <textarea
                                    value={inspiration}
                                    onChange={(e) => setInspiration(e.target.value)}
                                    rows={3}
                                    placeholder="e.g., Inspired by the palaces of Jaipur, learned from my grandmother..."
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all resize-none"
                                />
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={!craftType || !location || isGenerating}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-terracotta to-terracotta-light text-white rounded-xl font-semibold shadow-lg shadow-terracotta/20 hover:shadow-terracotta/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating with AI...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Generate Story
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Output */}
                    <div className="space-y-6">
                        <AnimatePresence mode="wait">
                            {isGenerating ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="bg-white rounded-2xl p-12 shadow-lg border border-warm-beige/50 text-center"
                                >
                                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-terracotta to-saffron flex items-center justify-center mb-4">
                                        <Sparkles className="w-8 h-8 text-white animate-pulse" />
                                    </div>
                                    <h3 className="font-heading text-lg font-semibold text-earth-brown mb-2">
                                        AI is crafting your story...
                                    </h3>
                                    <p className="text-sm text-earth-brown/50">
                                        Using Google Generative AI to create compelling content
                                    </p>
                                    <div className="mt-6 flex justify-center gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="w-3 h-3 rounded-full bg-terracotta"
                                                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ) : result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Story */}
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-warm-beige/50">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-earth-brown">
                                                <BookOpen className="w-5 h-5 text-terracotta" />
                                                Craft Story
                                            </h3>
                                            <button
                                                onClick={() => handleCopy(result.story, 'story')}
                                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-earth-brown/60 hover:text-terracotta bg-warm-beige/30 rounded-lg transition-colors"
                                            >
                                                {copied === 'story' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                {copied === 'story' ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <p className="text-earth-brown/70 leading-relaxed whitespace-pre-line text-sm">
                                            {result.story}
                                        </p>
                                    </div>

                                    {/* Product Description */}
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-warm-beige/50">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-earth-brown">
                                                <FileText className="w-5 h-5 text-saffron" />
                                                Product Description
                                            </h3>
                                            <button
                                                onClick={() => handleCopy(result.productDescription, 'desc')}
                                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-earth-brown/60 hover:text-terracotta bg-warm-beige/30 rounded-lg transition-colors"
                                            >
                                                {copied === 'desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                {copied === 'desc' ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <p className="text-earth-brown/70 leading-relaxed text-sm">
                                            {result.productDescription}
                                        </p>
                                    </div>

                                    {/* Marketing Caption */}
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-warm-beige/50">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-earth-brown">
                                                <Hash className="w-5 h-5 text-deep-green" />
                                                Marketing Caption
                                            </h3>
                                            <button
                                                onClick={() => handleCopy(result.marketingCaption, 'caption')}
                                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-earth-brown/60 hover:text-terracotta bg-warm-beige/30 rounded-lg transition-colors"
                                            >
                                                {copied === 'caption' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                {copied === 'caption' ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                        <p className="text-earth-brown/70 leading-relaxed whitespace-pre-line text-sm">
                                            {result.marketingCaption}
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white rounded-2xl p-12 shadow-lg border border-warm-beige/50 text-center"
                                >
                                    <div className="text-5xl mb-4">📖</div>
                                    <h3 className="font-heading text-xl font-semibold text-earth-brown mb-2">
                                        Your AI-Generated Content
                                    </h3>
                                    <p className="text-sm text-earth-brown/50 max-w-sm mx-auto">
                                        Fill in the details on the left and click "Generate Story" to create your craft story, product description, and marketing caption.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
