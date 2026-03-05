import { Link } from 'react-router-dom';
import { Sparkles, Heart, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-earth-brown text-warm-beige/80">
            {/* CTA Banner */}
            <div className="bg-gradient-to-r from-terracotta to-saffron">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                        Ready to Share Your Craft with the World?
                    </h3>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                        Join thousands of artisans who are using AI to tell their story and reach global buyers.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-terracotta font-semibold rounded-xl hover:bg-cream transition-colors shadow-lg"
                    >
                        <Sparkles className="w-5 h-5" />
                        Get Started Free
                    </Link>
                </div>
            </div>

            {/* Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta to-saffron flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-heading text-xl font-bold text-white">CraftConnect AI</span>
                        </div>
                        <p className="text-sm text-warm-beige/60 leading-relaxed mb-4">
                            Empowering India's artisans through AI-powered storytelling, marketing, and a global digital marketplace.
                        </p>
                        <div className="flex gap-3">
                            {['📸', '📘', '🐦', '💬'].map((icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-terracotta/50 transition-colors text-lg"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading text-lg font-semibold text-white mb-4">Explore</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { to: '/marketplace', label: 'Marketplace' },
                                { to: '/ai-tools', label: 'AI Tools' },
                                { to: '/dashboard', label: 'Dashboard' },
                                { to: '/login', label: 'Join as Artisan' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="hover:text-saffron transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Crafts */}
                    <div>
                        <h4 className="font-heading text-lg font-semibold text-white mb-4">Craft Categories</h4>
                        <ul className="space-y-2 text-sm">
                            {['Handloom', 'Pottery', 'Jewelry', 'Woodcraft', 'Painting', 'Embroidery'].map((c) => (
                                <li key={c}>
                                    <Link to="/marketplace" className="hover:text-saffron transition-colors">
                                        {c}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading text-lg font-semibold text-white mb-4">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-terracotta-light" />
                                New Delhi, India
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-terracotta-light" />
                                hello@craftconnect.ai
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-terracotta-light" />
                                +91 98765 43210
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-warm-beige/50">
                    <p>© 2026 CraftConnect AI. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-terracotta fill-terracotta" /> for India's Artisans
                    </p>
                </div>
            </div>
        </footer>
    );
}
