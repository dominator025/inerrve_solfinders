import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, MapPin, ChevronRight, Volume2 } from 'lucide-react';
import { mockProducts, mockArtisans } from '../utils/mockData';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const product = mockProducts.find((p) => p.id === id) || mockProducts[0];
    const artisan = mockArtisans.find((a) => a.id === product.artisanId);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const relatedProducts = mockProducts.filter(
        (p) => p.category === product.category && p.id !== product.id
    );

    const speakDescription = () => {
        const synth = window.speechSynthesis;
        if (synth.speaking) {
            synth.cancel();
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(product.description);
        // Try to find a good Hindi voice if description contains Devanagari, otherwise default
        const voices = synth.getVoices();
        const hindiVoice = voices.find(v => v.lang.startsWith('hi'));
        if (hindiVoice) utterance.voice = hindiVoice;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        synth.speak(utterance);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-cream pt-24 pb-16"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-earth-brown/50 mb-8">
                    <Link to="/" className="hover:text-terracotta">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/marketplace" className="hover:text-terracotta">Marketplace</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-earth-brown">{product.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-warm-beige/50 mb-4">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-terracotta shadow-md' : 'border-warm-beige'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-xs font-semibold rounded-full uppercase tracking-wide mb-3">
                            {product.category}
                        </span>
                        <div className="flex items-center justify-between gap-4 mb-3">
                            <h1 className="font-heading text-2xl md:text-3xl font-bold text-earth-brown">
                                {product.name}
                            </h1>
                            <button 
                                onClick={speakDescription}
                                className="flex items-center gap-2 px-3 py-1.5 bg-deep-green/10 text-deep-green rounded-full text-xs font-bold hover:bg-deep-green/20 transition-all border border-deep-green/10"
                            >
                                <Volume2 className="w-3.5 h-3.5" />
                                Listen
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(product.rating)
                                            ? 'text-saffron fill-saffron'
                                            : 'text-warm-beige fill-warm-beige'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-earth-brown/60">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-3xl font-bold text-earth-brown">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-xl text-earth-brown/40 line-through">
                                        ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                    <span className="px-2 py-0.5 bg-deep-green/10 text-deep-green text-sm font-semibold rounded">
                                        {discount}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Artisan */}
                        {artisan && (
                            <Link
                                to={`/artisan/${artisan.id}`}
                                className="flex items-center gap-3 p-4 bg-warm-beige/30 rounded-xl mb-6 hover:bg-warm-beige/50 transition-colors"
                            >
                                <img
                                    src={artisan.avatar}
                                    alt={artisan.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-terracotta/20"
                                />
                                <div>
                                    <p className="font-medium text-earth-brown">{artisan.name}</p>
                                    <p className="text-xs text-earth-brown/50 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {artisan.location}, {artisan.state} · {artisan.craftType}
                                    </p>
                                </div>
                            </Link>
                        )}

                        {/* Description */}
                        <p className="text-earth-brown/70 leading-relaxed mb-6">{product.description}</p>

                        {/* Materials */}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold text-earth-brown mb-2">Materials</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.materials.map((m) => (
                                    <span key={m} className="px-3 py-1.5 bg-warm-beige/50 text-earth-brown/70 text-sm rounded-lg">
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border border-warm-beige rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2.5 text-earth-brown hover:bg-warm-beige/50 transition-colors"
                                >−</button>
                                <span className="px-4 py-2.5 font-medium text-earth-brown border-x border-warm-beige">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2.5 text-earth-brown hover:bg-warm-beige/50 transition-colors"
                                >+</button>
                            </div>
                            <span className="text-sm text-deep-green font-medium">
                                ✓ In Stock
                            </span>
                        </div>

                        <div className="flex gap-3 mb-8">
                            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-terracotta to-terracotta-light text-white rounded-xl font-semibold shadow-lg shadow-terracotta/20 hover:shadow-terracotta/40 transition-all">
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button className="p-3.5 border border-warm-beige rounded-xl hover:bg-warm-beige/50 transition-colors">
                                <Heart className="w-5 h-5 text-earth-brown/60" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: Truck, label: 'Free Shipping' },
                                { icon: Shield, label: 'Authentic Craft' },
                                { icon: RotateCcw, label: 'Easy Returns' },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex flex-col items-center gap-1.5 p-3 bg-warm-beige/30 rounded-xl text-center">
                                    <Icon className="w-5 h-5 text-terracotta" />
                                    <span className="text-xs text-earth-brown/60">{label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Story Behind Product */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-md border border-warm-beige/50 mb-16"
                >
                    <h2 className="font-heading text-2xl font-bold text-earth-brown mb-4 flex items-center gap-2">
                        📖 Story Behind This Product
                    </h2>
                    <p className="text-earth-brown/70 leading-relaxed max-w-3xl">{product.story}</p>
                </motion.div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-earth-brown mb-6">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
