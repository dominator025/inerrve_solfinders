import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, Users, ShoppingBag, Share2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { mockArtisans, mockProducts } from '../utils/mockData';

export default function ArtisanProfilePage() {
    const { id } = useParams<{ id: string }>();
    const artisan = mockArtisans.find((a) => a.id === id) || mockArtisans[0];
    const artisanProducts = mockProducts.filter((p) => p.artisanId === artisan.id);

    return (
        <div className="min-h-screen bg-cream pt-20">
            {/* Hero Banner */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                    src={artisan.gallery[0]}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-brown/80 via-earth-brown/40 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative -mt-20 mb-8"
                >
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-warm-beige/50">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <img
                                src={artisan.avatar}
                                alt={artisan.name}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover ring-4 ring-white shadow-lg -mt-16 md:-mt-20"
                            />
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="font-heading text-2xl md:text-3xl font-bold text-earth-brown">
                                            {artisan.name}
                                        </h1>
                                        <p className="text-terracotta font-medium">{artisan.craftType} Artisan</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="px-6 py-2.5 bg-gradient-to-r from-terracotta to-terracotta-light text-white rounded-xl font-medium shadow-lg shadow-terracotta/20 hover:shadow-terracotta/40 transition-all">
                                            Follow
                                        </button>
                                        <button className="p-2.5 bg-white border border-warm-beige rounded-xl hover:bg-warm-beige/50 transition-colors">
                                            <Share2 className="w-5 h-5 text-earth-brown/60" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-4 text-sm text-earth-brown/60">
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" /> {artisan.location}, {artisan.state}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" /> {artisan.experience} years experience
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Star className="w-4 h-4 text-saffron fill-saffron" /> {artisan.rating} rating
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4" /> {artisan.followers.toLocaleString()} followers
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <ShoppingBag className="w-4 h-4" /> {artisan.productsCount} products
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8 pb-16">
                    {/* Story */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-warm-beige/50 mb-8">
                            <h2 className="font-heading text-xl font-bold text-earth-brown mb-4 flex items-center gap-2">
                                📖 My Craft Story
                            </h2>
                            <p className="text-earth-brown/70 leading-relaxed whitespace-pre-line">
                                {artisan.story}
                            </p>
                        </div>

                        {/* Products */}
                        <h2 className="font-heading text-xl font-bold text-earth-brown mb-6">
                            Products by {artisan.name}
                        </h2>
                        {artisanProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {artisanProducts.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-earth-brown/60">No products listed yet.</p>
                        )}
                    </motion.div>

                    {/* Sidebar - Gallery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-warm-beige/50 sticky top-24">
                            <h3 className="font-heading text-lg font-bold text-earth-brown mb-4">Gallery</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {artisan.gallery.map((img, i) => (
                                    <div
                                        key={i}
                                        className="aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                                    >
                                        <img
                                            src={img}
                                            alt={`${artisan.name}'s work ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Community Support */}
                            <div className="mt-6 pt-6 border-t border-warm-beige">
                                <h3 className="font-heading text-lg font-bold text-earth-brown mb-3">
                                    💝 Support This Artisan
                                </h3>
                                <p className="text-sm text-earth-brown/60 mb-4">
                                    Help {artisan.name} preserve and grow their craft tradition.
                                </p>
                                <button className="w-full px-4 py-3 bg-gradient-to-r from-deep-green to-deep-green-light text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                                    Donate & Support
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
