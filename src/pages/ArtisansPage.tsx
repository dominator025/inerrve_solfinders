import { motion } from 'framer-motion';
import ArtisanCard from '../components/ArtisanCard';
import { mockArtisans } from '../utils/mockData';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function ArtisansPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredArtisans = mockArtisans.filter(artisan => 
        artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.craftType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 lg:pt-32 pb-16 bg-cream min-h-screen"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12">
                    <span className="inline-block px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-semibold rounded-full mb-4">
                        Indian Artisans
                    </span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-brown mb-4">
                        Meet Our Master Crafters
                    </h1>
                    <p className="text-earth-brown/60 max-w-2xl text-lg leading-relaxed">
                        Discover the souls behind the crafts. Our artisans are the guardians of India's cultural heritage, 
                        preserving centuries-old traditions with every piece they create.
                    </p>
                </header>

                {/* Search Bar */}
                <div className="mb-12 max-w-md relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-earth-brown/40" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search artisans by name, craft, or city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-warm-beige rounded-2xl bg-white focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta transition-all text-earth-brown"
                    />
                </div>

                {/* Artisans Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArtisans.map((artisan, i) => (
                        <ArtisanCard key={artisan.id} artisan={artisan} index={i} />
                    ))}
                </div>

                {filteredArtisans.length === 0 && (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-warm-beige">
                        <p className="text-earth-brown/40 text-lg">No artisans found matching your search.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
