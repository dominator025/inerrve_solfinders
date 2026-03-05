import { motion } from 'framer-motion';
import { Heart, Target, Users, Linkedin, Github, Mail, User } from 'lucide-react';

const founders = [
    {
        name: 'Adrika Kaur',
        role: 'Co-Founder & CEO',
        bio: 'B.Tech student passionate about empowering artisans through technology and bridging the gap between traditional crafts and modern markets.',
        color: 'from-terracotta to-saffron',
    },
    {
        name: 'Bhaskar Thakur',
        role: 'Co-Founder & CTO',
        bio: 'B.Tech student and tech enthusiast building AI-powered tools that make craft storytelling and marketing accessible to every artisan.',
        color: 'from-deep-green to-deep-green-light',
    },
    {
        name: 'Laxmi',
        role: 'Co-Founder & Design Lead',
        bio: 'B.Tech student crafting beautiful experiences that honor India\'s heritage while embracing the future of digital commerce.',
        color: 'from-saffron to-gold',
    },
    {
        name: 'Kashish Bharti',
        role: 'Co-Founder & Operations',
        bio: 'B.Tech student dedicated to building sustainable supply chains that ensure fair trade and growth for artisan communities across India.',
        color: 'from-rust to-terracotta',
    },
];

const values = [
    {
        icon: Heart,
        title: 'Artisan First',
        description: 'Everything we build starts with the artisan. Their growth is our success.',
    },
    {
        icon: Target,
        title: 'AI for Good',
        description: 'Leveraging AI to break barriers, not create them. Technology that empowers.',
    },
    {
        icon: Users,
        title: 'Community Driven',
        description: 'Building a vibrant community where artisans learn, grow, and thrive together.',
    },
];

export default function AboutSection() {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-b from-warm-beige/30 to-cream relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-terracotta/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-saffron/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-terracotta/10 text-terracotta text-sm font-semibold rounded-full mb-4">
                        🙏 About Us
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-brown mb-4">
                        The Team Behind CraftConnect AI
                    </h2>
                    <p className="text-earth-brown/60 max-w-2xl mx-auto leading-relaxed">
                        We're a passionate team dedicated to preserving India's rich craft heritage
                        by empowering artisans with cutting-edge AI technology and global market access.
                    </p>
                </motion.div>

                {/* Mission statement */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-earth-brown to-earth-brown-dark rounded-3xl p-8 md:p-12 text-white mb-16 relative overflow-hidden"
                >
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/15 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-saffron/10 rounded-full blur-3xl" />
                    </div>
                    <div className="relative text-center max-w-3xl mx-auto">
                        <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
                        <p className="text-white/80 text-lg leading-relaxed">
                            To transform the lives of India's 7 million+ artisans by connecting them directly
                            with global markets through AI-powered storytelling, smart pricing, and digital
                            marketing — preserving centuries-old traditions while building sustainable livelihoods.
                        </p>
                    </div>
                </motion.div>

                {/* Core Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {values.map((value, i) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-6 shadow-md border border-warm-beige/50 text-center hover:shadow-lg transition-shadow"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-terracotta to-saffron flex items-center justify-center shadow-md">
                                <value.icon className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="font-heading text-lg font-semibold text-earth-brown mb-2">
                                {value.title}
                            </h4>
                            <p className="text-sm text-earth-brown/60 leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Founders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-earth-brown mb-2">
                        Meet Our Founders
                    </h3>
                    <p className="text-earth-brown/60">
                        The dreamers and builders making it all happen.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {founders.map((founder, i) => (
                        <motion.div
                            key={founder.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-warm-beige/50"
                        >
                            {/* Gradient top bar */}
                            <div className={`h-2 bg-gradient-to-r ${founder.color}`} />

                            {/* Icon avatar */}
                            <div className="pt-6 pb-4 flex justify-center">
                                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${founder.color} flex items-center justify-center shadow-lg`}>
                                    <User className="w-10 h-10 text-white" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="px-5 pb-6 text-center">
                                <h4 className="font-heading text-lg font-bold text-earth-brown group-hover:text-terracotta transition-colors">
                                    {founder.name}
                                </h4>
                                <p className="text-xs font-semibold text-terracotta/80 uppercase tracking-wider mt-1 mb-3">
                                    {founder.role}
                                </p>
                                <p className="text-sm text-earth-brown/60 leading-relaxed">
                                    {founder.bio}
                                </p>

                                {/* Social icons */}
                                <div className="flex justify-center gap-3 mt-4">
                                    <button className="w-8 h-8 rounded-full bg-warm-beige/50 hover:bg-terracotta/10 flex items-center justify-center text-earth-brown/40 hover:text-terracotta transition-all">
                                        <Linkedin className="w-4 h-4" />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-warm-beige/50 hover:bg-terracotta/10 flex items-center justify-center text-earth-brown/40 hover:text-terracotta transition-all">
                                        <Github className="w-4 h-4" />
                                    </button>
                                    <button className="w-8 h-8 rounded-full bg-warm-beige/50 hover:bg-terracotta/10 flex items-center justify-center text-earth-brown/40 hover:text-terracotta transition-all">
                                        <Mail className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
