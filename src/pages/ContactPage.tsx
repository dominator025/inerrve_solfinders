import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 lg:pt-32 pb-24 bg-cream min-h-screen"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Info */}
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-saffron/10 text-saffron-dark text-sm font-semibold rounded-full mb-4">
                            Contact Us
                        </span>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-brown mb-6">
                            We'd Love to Hear From You
                        </h1>
                        <p className="text-earth-brown/60 text-lg leading-relaxed mb-12">
                            Have questions about our artisans, products, or AI tools? 
                            Our support team is here to help you bridge the gap.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Mail, label: 'Email Us', value: 'hello@craftconnect.ai', color: 'text-terracotta bg-terracotta/10' },
                                { icon: Phone, label: 'Call Us', value: '+91 1800-CRAFT-AI', color: 'text-deep-green bg-deep-green/10' },
                                { icon: MapPin, label: 'Visit Us', value: 'Artisan Hub, Tech Park, Bangalore, India', color: 'text-earth-brown bg-earth-brown/10' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-5">
                                    <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-earth-brown/40 uppercase tracking-wider">{item.label}</p>
                                        <p className="text-lg font-semibold text-earth-brown">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-earth-brown/5 border border-warm-beige">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-earth-brown/70 ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John Doe"
                                        className="w-full px-5 py-3 rounded-2xl border border-warm-beige bg-cream/30 focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-earth-brown/70 ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com"
                                        className="w-full px-5 py-3 rounded-2xl border border-warm-beige bg-cream/30 focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-earth-brown/70 ml-1">Subject</label>
                                <select className="w-full px-5 py-3 rounded-2xl border border-warm-beige bg-cream/30 focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none transition-all appearance-none cursor-pointer">
                                    <option>General Inquiry</option>
                                    <option>Artisan Partnership</option>
                                    <option>Order Support</option>
                                    <option>Technical Assistance</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-earth-brown/70 ml-1">Your Message</label>
                                <textarea 
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className="w-full px-5 py-3 rounded-2xl border border-warm-beige bg-cream/30 focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta outline-none transition-all resize-none"
                                />
                            </div>

                            <button className="w-full py-4 bg-gradient-to-r from-terracotta to-saffron text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-terracotta/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
