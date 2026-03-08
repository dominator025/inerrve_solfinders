import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../services/firestore';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const [imageError, setImageError] = useState(false);
    
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const placeholderImage = 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&h=600&fit=crop&q=80';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
        >
            <Link
                to={`/product/${product.id}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-warm-beige/50"
            >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-warm-beige/10">
                    <img
                        src={imageError ? placeholderImage : product.images[0]}
                        alt={product.name}
                        onError={() => setImageError(true)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.featured && (
                            <span className="px-2.5 py-1 bg-saffron text-white text-xs font-bold rounded-full shadow-md">
                                Featured
                            </span>
                        )}
                        {discount > 0 && (
                            <span className="px-2.5 py-1 bg-deep-green text-white text-xs font-bold rounded-full shadow-md">
                                {discount}% OFF
                            </span>
                        )}
                    </div>

                    {/* Quick actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        <button
                            onClick={(e) => { e.preventDefault(); }}
                            className="p-2 bg-white rounded-full shadow-lg hover:bg-terracotta hover:text-white transition-colors"
                        >
                            <Heart className="w-4 h-4" />
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); }}
                            className="p-2 bg-white rounded-full shadow-lg hover:bg-terracotta hover:text-white transition-colors"
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <p className="text-xs text-terracotta font-medium mb-1 uppercase tracking-wide">
                        {product.category}
                    </p>
                    <h3 className="font-heading text-base font-semibold text-earth-brown group-hover:text-terracotta transition-colors line-clamp-1 mb-1">
                        {product.name}
                    </h3>
                    <p className="text-xs text-earth-brown/50 mb-3">
                        by {product.artisanName}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-earth-brown">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-earth-brown/40 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-saffron fill-saffron" />
                            <span className="text-sm font-medium text-earth-brown">{product.rating}</span>
                            <span className="text-xs text-earth-brown/40">({product.reviews})</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
