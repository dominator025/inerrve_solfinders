import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Star, ShoppingBag } from 'lucide-react';
import type { Artisan } from '../utils/mockData';

interface ArtisanCardProps {
    artisan: Artisan;
    index?: number;
}

export default function ArtisanCard({ artisan, index = 0 }: ArtisanCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <Link
                to={`/artisan/${artisan.id}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-warm-beige/50"
            >
                {/* Gallery Preview */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={artisan.gallery[0]}
                        alt={`${artisan.name}'s craft`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-brown/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-terracotta">
                            {artisan.craftType}
                        </span>
                        <span className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-earth-brown">
                            <Star className="w-3 h-3 text-saffron fill-saffron" />
                            {artisan.rating}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src={artisan.avatar}
                            alt={artisan.name}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-terracotta/20"
                        />
                        <div>
                            <h3 className="font-heading text-lg font-semibold text-earth-brown group-hover:text-terracotta transition-colors">
                                {artisan.name}
                            </h3>
                            <p className="flex items-center gap-1 text-sm text-earth-brown/50">
                                <MapPin className="w-3 h-3" />
                                {artisan.location}, {artisan.state}
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-earth-brown/60 line-clamp-2 mb-4 leading-relaxed">
                        {artisan.story}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-warm-beige/50">
                        <span className="text-xs text-earth-brown/40">{artisan.experience} yrs experience</span>
                        <span className="flex items-center gap-1 text-xs text-earth-brown/40">
                            <ShoppingBag className="w-3 h-3" />
                            {artisan.productsCount} products
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
