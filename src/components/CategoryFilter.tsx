import { motion } from 'framer-motion';
import { CRAFT_CATEGORIES } from '../utils/constants';

interface CategoryFilterProps {
    selected: string;
    onChange: (category: string) => void;
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
    const allCategories = [{ id: 'all', label: 'All Crafts', icon: '✨', color: '#C75B39' }, ...CRAFT_CATEGORIES];

    return (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {allCategories.map((cat) => {
                const isActive = selected === cat.id;
                return (
                    <motion.button
                        key={cat.id}
                        onClick={() => onChange(cat.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${isActive
                                ? 'bg-terracotta text-white border-terracotta shadow-lg shadow-terracotta/20'
                                : 'bg-white text-earth-brown/70 border-warm-beige hover:border-terracotta/30 hover:bg-warm-beige/30'
                            }`}
                    >
                        <span className="text-base">{cat.icon}</span>
                        <span>{cat.label}</span>
                    </motion.button>
                );
            })}
        </div>
    );
}
