import { useState } from 'react';
import { motion } from 'framer-motion';

interface CraftRegion {
    id: string;
    name: string;
    crafts: string[];
    x: number;
    y: number;
}

const regions: CraftRegion[] = [
    { id: 'kashmir', name: 'Kashmir', crafts: ['Pashmina', 'Papier-Mâché', 'Carpet Weaving'], x: 30, y: 8 },
    { id: 'punjab', name: 'Punjab', crafts: ['Phulkari', 'Jutti Making'], x: 25, y: 18 },
    { id: 'rajasthan', name: 'Rajasthan', crafts: ['Blue Pottery', 'Block Printing', 'Bandhani'], x: 18, y: 35 },
    { id: 'gujarat', name: 'Gujarat', crafts: ['Patola Silk', 'Bandhani', 'Rogan Art'], x: 12, y: 48 },
    { id: 'up', name: 'Uttar Pradesh', crafts: ['Chikankari', 'Woodcarving', 'Brasswork'], x: 40, y: 30 },
    { id: 'bihar', name: 'Bihar', crafts: ['Madhubani Painting', 'Sujni Embroidery'], x: 52, y: 32 },
    { id: 'wb', name: 'West Bengal', crafts: ['Kantha', 'Terracotta', 'Dokra'], x: 58, y: 38 },
    { id: 'odisha', name: 'Odisha', crafts: ['Pattachitra', 'Silver Filigree', 'Appliqué'], x: 52, y: 50 },
    { id: 'mp', name: 'Madhya Pradesh', crafts: ['Chanderi', 'Gond Art', 'Bagh Print'], x: 35, y: 45 },
    { id: 'maharashtra', name: 'Maharashtra', crafts: ['Paithani', 'Kolhapuri Chappal', 'Warli'], x: 25, y: 55 },
    { id: 'karnataka', name: 'Karnataka', crafts: ['Mysore Silk', 'Bidriware', 'Channapatna Toys'], x: 28, y: 68 },
    { id: 'kerala', name: 'Kerala', crafts: ['Kasavu Saree', 'Aranmula Mirror', 'Coir'], x: 30, y: 80 },
    { id: 'tn', name: 'Tamil Nadu', crafts: ['Kanchipuram Silk', 'Tanjore Painting', 'Bronze'], x: 38, y: 78 },
    { id: 'ap', name: 'Andhra Pradesh', crafts: ['Kalamkari', 'Kondapalli Toys'], x: 40, y: 62 },
    { id: 'assam', name: 'Assam', crafts: ['Muga Silk', 'Cane & Bamboo'], x: 70, y: 30 },
    { id: 'manipur', name: 'Manipur', crafts: ['Longpi Pottery', 'Shaphee Lanphee'], x: 75, y: 32 },
];

export default function CraftMapIndia() {
    const [activeRegion, setActiveRegion] = useState<CraftRegion | null>(null);

    return (
        <section className="py-16 lg:py-24 bg-warm-beige/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 bg-deep-green/10 text-deep-green text-sm font-semibold rounded-full mb-4">
                        🗺️ Craft Map of India
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-4">
                        Discover Crafts by Region
                    </h2>
                    <p className="text-earth-brown/60 max-w-2xl mx-auto">
                        India's diverse craft traditions span every corner of the nation. Explore the unique artistry of each region.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Map */}
                    <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-warm-beige/50 min-h-[500px]">
                        {/* India outline (simplified) */}
                        <div className="relative w-full h-[450px]">
                            <div className="absolute inset-0 bg-gradient-to-b from-warm-beige/30 to-warm-beige/10 rounded-2xl" />

                            {regions.map((region) => (
                                <motion.button
                                    key={region.id}
                                    className={`absolute w-5 h-5 rounded-full border-2 cursor-pointer z-10 transition-all ${activeRegion?.id === region.id
                                            ? 'bg-terracotta border-terracotta scale-150 shadow-lg shadow-terracotta/30'
                                            : 'bg-saffron/60 border-saffron hover:bg-terracotta hover:border-terracotta hover:scale-125'
                                        }`}
                                    style={{ left: `${region.x}%`, top: `${region.y}%` }}
                                    onClick={() => setActiveRegion(region)}
                                    whileHover={{ scale: 1.3 }}
                                    whileTap={{ scale: 0.9 }}
                                    title={region.name}
                                />
                            ))}

                            {/* India text label */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <p className="text-6xl font-heading font-bold text-earth-brown/5">INDIA</p>
                            </div>
                        </div>
                    </div>

                    {/* Region Info */}
                    <div className="space-y-4">
                        {activeRegion ? (
                            <motion.div
                                key={activeRegion.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-warm-beige/50"
                            >
                                <h3 className="font-heading text-2xl font-bold text-earth-brown mb-2">
                                    {activeRegion.name}
                                </h3>
                                <p className="text-earth-brown/60 mb-6">
                                    Discover the traditional crafts and artisan communities of {activeRegion.name}.
                                </p>
                                <div className="space-y-3">
                                    {activeRegion.crafts.map((craft) => (
                                        <div
                                            key={craft}
                                            className="flex items-center gap-3 px-4 py-3 bg-warm-beige/30 rounded-xl"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-terracotta to-saffron flex items-center justify-center text-white text-sm">
                                                ✦
                                            </div>
                                            <span className="font-medium text-earth-brown">{craft}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-warm-beige/50 text-center">
                                <div className="text-5xl mb-4">🗺️</div>
                                <h3 className="font-heading text-xl font-semibold text-earth-brown mb-2">
                                    Select a Region
                                </h3>
                                <p className="text-earth-brown/60">
                                    Click on any dot on the map to explore crafts from that region of India.
                                </p>
                            </div>
                        )}

                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: '16+', label: 'States' },
                                { value: '50+', label: 'Craft Types' },
                                { value: '1000+', label: 'Artisans' },
                            ].map((stat) => (
                                <div key={stat.label} className="bg-white rounded-xl p-4 text-center shadow-md border border-warm-beige/50">
                                    <p className="text-xl font-bold text-terracotta">{stat.value}</p>
                                    <p className="text-xs text-earth-brown/50">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
