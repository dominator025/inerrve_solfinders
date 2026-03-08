import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ArtisanCard from '../components/ArtisanCard';
import ProductCard from '../components/ProductCard';
import AIToolCard from '../components/AIToolCard';
import CraftMapIndia from '../components/CraftMapIndia';
import VoiceButton from '../components/VoiceButton';
import { mockArtisans, mockProducts, mockCulturalStories } from '../utils/mockData';
import { HOW_IT_WORKS_STEPS } from '../utils/constants';

export default function HomePage() {
    const featuredProducts = mockProducts.filter((p) => p.featured);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <HeroSection />

            {/* Featured Artisans */}
            <section id="artisans-section" className="py-16 lg:py-24 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row md:items-end justify-between mb-12"
                    >
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-semibold rounded-full mb-4">
                                ✨ Meet Our Artisans
                            </span>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown">
                                Featured Artisans
                            </h2>
                            <p className="text-earth-brown/60 mt-2 max-w-lg">
                                Discover the talented craftspeople keeping India's traditions alive through their extraordinary skills.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <VoiceButton />
                            <Link
                                to="/artisans"
                                className="flex items-center gap-2 text-terracotta font-medium hover:gap-3 transition-all"
                            >
                                Meet All Artisans
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockArtisans.slice(0, 3).map((artisan, i) => (
                            <ArtisanCard key={artisan.id} artisan={artisan} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section id="products-section" className="py-16 lg:py-24 bg-warm-beige/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1.5 bg-saffron/10 text-saffron-dark text-sm font-semibold rounded-full mb-4">
                            🔥 Trending Now
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-3">
                            Popular Handmade Crafts
                        </h2>
                        <p className="text-earth-brown/60 max-w-2xl mx-auto mb-8">
                            Explore our most-loved handcrafted products, each telling a unique story of Indian heritage.
                        </p>
                        <Link
                            to="/marketplace"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-terracotta text-white rounded-xl font-medium hover:bg-terracotta-dark transition-all shadow-md"
                        >
                            Explore Marketplace
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="steps-section" className="py-16 lg:py-24 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1.5 bg-deep-green/10 text-deep-green text-sm font-semibold rounded-full mb-4">
                            🚀 Get Started
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-3">
                            How It Works
                        </h2>
                        <p className="text-earth-brown/60 max-w-2xl mx-auto">
                            From creating your profile to reaching global buyers — here's how CraftConnect AI empowers artisans.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {HOW_IT_WORKS_STEPS.map((step, i) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className="relative text-center"
                            >
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-terracotta to-saffron flex items-center justify-center text-3xl mb-5 shadow-lg">
                                    {step.icon}
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-earth-brown text-white text-sm font-bold flex items-center justify-center md:right-auto md:left-1/2 md:ml-6 lg:ml-8">
                                    {step.step}
                                </div>
                                <h3 className="font-heading text-lg font-semibold text-earth-brown mb-2">{step.title}</h3>
                                <p className="text-sm text-earth-brown/60 leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Tools Section */}
            <section id="ai-tools-section" className="py-16 lg:py-24 bg-gradient-to-br from-earth-brown to-earth-brown-dark text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-terracotta/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-saffron text-sm font-semibold rounded-full mb-4">
                            <Sparkles className="w-4 h-4" />
                            Powered by Google AI
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
                            AI Tools for Artisans
                        </h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            Leverage the power of AI to tell your story, create product descriptions, and market your crafts globally.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AIToolCard
                            icon="📖"
                            title="AI Story Generator"
                            description="Transform simple inputs into compelling craft stories that connect emotionally with buyers."
                            link="/ai-tools"
                            gradient="bg-gradient-to-br from-terracotta to-saffron"
                            index={0}
                        />
                        <AIToolCard
                            icon="📝"
                            title="Product Description AI"
                            description="Auto-generate professional product descriptions, SEO keywords, and short summaries."
                            link="/ai-tools"
                            gradient="bg-gradient-to-br from-saffron to-gold"
                            index={1}
                        />
                        <AIToolCard
                            icon="📢"
                            title="Marketing Assistant"
                            description="Create platform-specific marketing captions for Instagram, Facebook, and more."
                            link="/ai-marketing"
                            gradient="bg-gradient-to-br from-deep-green to-deep-green-light"
                            index={2}
                        />
                    </div>
                </div>
            </section>

            {/* Cultural Stories */}
            <section id="stories-section" className="py-16 lg:py-24 bg-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-semibold rounded-full mb-4">
                            <BookOpen className="w-4 h-4" />
                            Heritage Stories
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-3">
                            Stories Behind the Crafts
                        </h2>
                        <p className="text-earth-brown/60 max-w-2xl mx-auto">
                            Every craft carries centuries of cultural heritage. Discover the fascinating stories behind India's traditional arts.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mockCulturalStories.map((story, i) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-warm-beige/50"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-earth-brown/60 to-transparent" />
                                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-terracotta">
                                        {story.region}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-heading text-lg font-semibold text-earth-brown mb-2 group-hover:text-terracotta transition-colors">
                                        {story.title}
                                    </h3>
                                    <p className="text-sm text-earth-brown/60 line-clamp-3 leading-relaxed">
                                        {story.excerpt}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview */}
            <section id="about-section" className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-deep-green/10 text-deep-green text-sm font-semibold rounded-full mb-4">
                                🌿 Our Values
                            </span>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-6">
                                Crafting a Future for Indian Heritage
                            </h2>
                            <p className="text-earth-brown/60 text-lg leading-relaxed mb-8">
                                CraftConnect is on a mission to empower rural artisans by connecting them 
                                directly with global markets through AI-driven storytelling and digital tools.
                            </p>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-earth-brown text-white rounded-full font-semibold hover:bg-earth-brown-dark transition-all group"
                            >
                                Learn More About Us
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1590732823619-3733075bf712?w=800&h=600&fit=crop" 
                                alt="Artisan working" 
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Craft Map of India */}
            <CraftMapIndia />
        </motion.div>
    );
}
