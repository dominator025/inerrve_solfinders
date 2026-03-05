import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, Sparkles, Plus, X, Loader2, ChevronRight } from 'lucide-react';
import { CRAFT_CATEGORIES } from '../utils/constants';
import { generateProductDescription } from '../ai/productDescriptionGenerator';

export default function CreateProductPage() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [materials, setMaterials] = useState('');
    const [description, setDescription] = useState('');
    const [story, setStory] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAIGenerate = async () => {
        if (!name || !category) return;
        setIsGenerating(true);
        try {
            const result = await generateProductDescription({
                productName: name,
                category,
                materials,
            });
            setDescription(result.description);
        } catch (error) {
            console.error('AI generation failed:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const addDemoImage = () => {
        const demoImages = [
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop',
            'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop',
        ];
        if (images.length < 5) {
            setImages([...images, demoImages[images.length % demoImages.length]]);
        }
    };

    return (
        <div className="min-h-screen bg-cream pt-24 pb-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-earth-brown/50 mb-6">
                    <Link to="/dashboard" className="hover:text-terracotta">Dashboard</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-earth-brown">Create Product</span>
                </nav>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="font-heading text-2xl md:text-3xl font-bold text-earth-brown mb-2">
                        List a New Product
                    </h1>
                    <p className="text-earth-brown/60 mb-8">Add your handmade creation to the marketplace.</p>

                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-warm-beige/50">
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            {/* Images */}
                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-2">Product Images</label>
                                <div className="flex gap-3 flex-wrap">
                                    {images.map((img, i) => (
                                        <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-warm-beige group">
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                                                className="absolute top-1 right-1 p-1 bg-white/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3 text-rust" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addDemoImage}
                                        className="w-24 h-24 rounded-xl border-2 border-dashed border-warm-beige hover:border-terracotta/50 flex flex-col items-center justify-center gap-1 text-earth-brown/40 hover:text-terracotta transition-colors"
                                    >
                                        <Upload className="w-5 h-5" />
                                        <span className="text-xs">Upload</span>
                                    </button>
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Product Name *</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g., Blue Pottery Vase — Floral Motif"
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                                />
                            </div>

                            {/* Category & Price */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-earth-brown mb-1.5">Category *</label>
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown transition-all"
                                    >
                                        <option value="">Select</option>
                                        {CRAFT_CATEGORIES.map((c) => (
                                            <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-earth-brown mb-1.5">Price (₹) *</label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="2499"
                                        className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Materials */}
                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Materials</label>
                                <input
                                    type="text"
                                    value={materials}
                                    onChange={(e) => setMaterials(e.target.value)}
                                    placeholder="e.g., Clay, natural dyes, quartz powder"
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                                />
                            </div>

                            {/* Description with AI */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-sm font-medium text-earth-brown">Description</label>
                                    <button
                                        type="button"
                                        onClick={handleAIGenerate}
                                        disabled={!name || !category || isGenerating}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-terracotta bg-terracotta/10 rounded-lg hover:bg-terracotta/20 disabled:opacity-50 transition-colors"
                                    >
                                        {isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                                        {isGenerating ? 'Generating...' : 'AI Generate'}
                                    </button>
                                </div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={5}
                                    placeholder="Describe your product or use AI to generate a description..."
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all resize-none"
                                />
                            </div>

                            {/* Story */}
                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">
                                    Story Behind This Product
                                </label>
                                <textarea
                                    value={story}
                                    onChange={(e) => setStory(e.target.value)}
                                    rows={3}
                                    placeholder="Share the inspiration and cultural significance behind this piece..."
                                    className="w-full px-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all resize-none"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-terracotta to-terracotta-light text-white rounded-xl font-semibold shadow-lg shadow-terracotta/20 hover:shadow-terracotta/40 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    List Product
                                </button>
                                <Link
                                    to="/dashboard"
                                    className="px-6 py-3.5 bg-warm-beige/30 text-earth-brown/60 rounded-xl font-medium hover:bg-warm-beige/50 transition-colors"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
