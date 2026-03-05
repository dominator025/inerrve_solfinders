import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cream via-warm-beige-light to-warm-beige">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating geometric patterns */}
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 rounded-full bg-terracotta/5 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-saffron/8 blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], y: [0, -20, 0] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-deep-green/3 blur-3xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />

                {/* Decorative dots pattern */}
                <div className="absolute top-32 right-20 grid grid-cols-5 gap-3 opacity-20">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-terracotta" />
                    ))}
                </div>
                <div className="absolute bottom-32 left-20 grid grid-cols-4 gap-3 opacity-15">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-saffron" />
                    ))}
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta/10 rounded-full mb-6"
                        >
                            <Sparkles className="w-4 h-4 text-terracotta" />
                            <span className="text-sm font-medium text-terracotta">AI-Powered Artisan Platform</span>
                        </motion.div>

                        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-earth-brown leading-[1.1] mb-6">
                            Empowering{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terracotta to-saffron">
                                India's Artisans
                            </span>{' '}
                            Through AI
                        </h1>

                        <p className="text-lg text-earth-brown/70 leading-relaxed mb-8 max-w-lg">
                            A story-driven marketplace where traditional craftsmanship meets modern technology.
                            Showcase your handmade creations to the world with AI-powered storytelling and marketing.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/marketplace"
                                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-terracotta to-terracotta-light text-white rounded-xl font-semibold shadow-xl shadow-terracotta/25 hover:shadow-terracotta/40 hover:scale-[1.02] transition-all duration-300"
                            >
                                Explore Marketplace
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/ai-tools"
                                className="group flex items-center gap-2 px-7 py-3.5 bg-white text-earth-brown rounded-xl font-semibold shadow-lg border border-warm-beige hover:border-terracotta/30 hover:shadow-xl transition-all duration-300"
                            >
                                <Play className="w-5 h-5 text-terracotta" />
                                Try AI Tools
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-12 pt-8 border-t border-earth-brown/10">
                            {[
                                { value: '5000+', label: 'Artisans' },
                                { value: '25K+', label: 'Products' },
                                { value: '100+', label: 'Craft Types' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 + i * 0.1 }}
                                >
                                    <div className="text-2xl font-bold text-earth-brown">{stat.value}</div>
                                    <div className="text-sm text-earth-brown/50">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side — Image Collage */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative hidden lg:block lg:ml-8 mt-4"
                    >
                        <div className="relative w-full h-[600px] flex items-center justify-center gap-8">
                            {/* Decorative element inside collage */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-terracotta/5 to-saffron/5 rounded-full blur-3xl -z-10" />

                            {/* Left Image Component */}
                            <div className="relative -mt-32">
                                <motion.div
                                    className="w-[260px] h-[360px] rounded-3xl overflow-hidden shadow-xl border-[6px] border-white z-10"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    initial={{ y: 0 }}
                                >
                                    <img
                                        src="/hero-left-image.jpg"
                                        alt="Artisans making pottery"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity hover:opacity-75" />
                                </motion.div>

                                {/* Floating badge 1 has been removed as per user request */}
                            </div>

                            {/* Right Image Component */}
                            <div className="relative mt-8 z-20">
                                <motion.div
                                    className="w-[280px] h-[380px] rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white"
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    initial={{ y: 0 }}
                                >
                                    <img
                                        src="/hero-right-image.png"
                                        alt="Artisans collage"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity hover:opacity-75" />
                                </motion.div>

                                {/* Floating stats badge 2 has been removed as per user request */}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
