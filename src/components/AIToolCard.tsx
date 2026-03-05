import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AIToolCardProps {
    icon: string;
    title: string;
    description: string;
    link: string;
    gradient: string;
    index?: number;
}

export default function AIToolCard({ icon, title, description, link, gradient, index = 0 }: AIToolCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
        >
            <Link
                to={link}
                className="group block bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-warm-beige/50 relative overflow-hidden"
            >
                {/* Gradient accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity ${gradient}`} />

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 ${gradient} shadow-lg`}>
                    {icon}
                </div>

                <h3 className="font-heading text-lg font-semibold text-earth-brown mb-2 group-hover:text-terracotta transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-earth-brown/60 leading-relaxed mb-4">
                    {description}
                </p>

                <div className="flex items-center gap-1 text-terracotta text-sm font-medium group-hover:gap-2 transition-all">
                    Try Now
                    <ArrowRight className="w-4 h-4" />
                </div>
            </Link>
        </motion.div>
    );
}
