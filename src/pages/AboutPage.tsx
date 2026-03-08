import { motion } from 'framer-motion';
import AboutSection from '../components/AboutSection';
import { Sparkles, Heart, Globe, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 lg:pt-32 bg-cream"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <header className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-deep-green/10 text-deep-green text-sm font-semibold rounded-full mb-4">
                        Our Mission
                    </span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-brown mb-6">
                        Empowering Indian Artisans through AI
                    </h1>
                    <p className="text-earth-brown/60 max-w-3xl mx-auto text-lg leading-relaxed">
                        CraftConnect AI is more than a marketplace. It's a movement to bridge the gap between 
                        rural Indian craftsmanship and global appreciative buyers using the power of technology.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {[
                        { 
                            icon: Heart, 
                            title: 'Artisan-First', 
                            desc: 'We prioritize the well-being and growth of our craftspeople, ensuring fair trade and recognition.',
                            color: 'bg-terracotta'
                        },
                        { 
                            icon: Sparkles, 
                            title: 'AI Storytelling', 
                            desc: 'Our AI tools help artisans tell their unique cultural stories to the world in any language.',
                            color: 'bg-saffron'
                        },
                        { 
                            icon: Globe, 
                            title: 'Global Reach', 
                            desc: 'Bridging the distance from remote villages to homes across the globe.',
                            color: 'bg-deep-green'
                        },
                        { 
                            icon: ShieldCheck, 
                            title: 'Authenticity', 
                            desc: 'Every piece is verified for authentic handcrafted quality and heritage value.',
                            color: 'bg-earth-brown'
                        }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-warm-beige hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 ${feature.color} text-white rounded-2xl flex items-center justify-center mb-6`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-earth-brown mb-3">{feature.title}</h3>
                            <p className="text-earth-brown/60 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <AboutSection />

            <section className="py-24 bg-white border-t border-warm-beige">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-heading text-3xl font-bold text-earth-brown mb-8">Join the Movement</h2>
                    <p className="text-earth-brown/60 text-lg leading-relaxed mb-10">
                        Whether you're an artisan looking to share your craft or a buyer seeking authentic 
                        handmade treasures, CraftConnect is your home for Indian heritage.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-8 py-3 bg-terracotta text-white rounded-full font-semibold shadow-lg shadow-terracotta/20 hover:scale-105 transition-all">
                            Register as Artisan
                        </button>
                        <button className="px-8 py-3 border-2 border-earth-brown text-earth-brown rounded-full font-semibold hover:bg-earth-brown hover:text-white transition-all">
                            Explore Marketplace
                        </button>
                    </div>
                </div>
            </section>
        </motion.div>
    );
}
