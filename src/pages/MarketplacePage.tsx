import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import { getAllProducts } from '../services/firestore';
import type { Product } from '../services/firestore';

export default function MarketplacePage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');

    // Data fetching state
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function fetchProducts() {
            try {
                setLoading(true);
                const fetchedProducts = await getAllProducts();
                if (isMounted) {
                    setProducts(fetchedProducts as Product[]); // Cast if needed, assuming firestore returns Product[]
                    setError(null);
                }
            } catch (err: any) {
                if (isMounted) {
                    console.error("Error fetching products:", err);
                    setError("Failed to load products. Please try again later.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    const filteredProducts = useMemo(() => {
        let currentProducts = [...products];

        if (selectedCategory !== 'all') {
            currentProducts = currentProducts.filter((p) => p.category === selectedCategory);
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            currentProducts = currentProducts.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.artisanName.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q)
            );
        }

        switch (sortBy) {
            case 'priceLow':
                currentProducts.sort((a, b) => a.price - b.price);
                break;
            case 'priceHigh':
                currentProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                currentProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                currentProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        return currentProducts;
    }, [products, selectedCategory, searchQuery, sortBy]);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-cream pt-24 pb-16"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-2">
                        Marketplace
                    </h1>
                    <p className="text-earth-brown/60">
                        Discover authentic handmade crafts from India's finest artisans
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 space-y-4"
                >
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown/40" />
                            <input
                                type="text"
                                placeholder="Search crafts, artisans, materials..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-earth-brown/40" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 bg-white rounded-xl border border-warm-beige text-earth-brown text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none"
                            >
                                <option value="featured">Featured</option>
                                <option value="priceLow">Price: Low to High</option>
                                <option value="priceHigh">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </div>

                    <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
                </motion.div>

                {error ? (
                    <div className="text-center py-20">
                        <div className="text-5xl mb-4 text-rust">⚠️</div>
                        <h3 className="font-heading text-xl font-semibold text-earth-brown mb-2">Oops! Something went wrong</h3>
                        <p className="text-earth-brown/60">{error}</p>
                    </div>
                ) : loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-terracotta animate-spin mb-4" />
                        <p className="text-earth-brown/60 animate-pulse">Loading amazing crafts...</p>
                    </div>
                ) : (
                    <>
                        {/* Results count */}
                        <p className="text-sm text-earth-brown/50 mb-6">
                            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                        </p>

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="text-5xl mb-4">🔍</div>
                                <h3 className="font-heading text-xl font-semibold text-earth-brown mb-2">No products found</h3>
                                <p className="text-earth-brown/60">Try adjusting your search or filter criteria.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}
