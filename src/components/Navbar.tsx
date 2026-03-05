import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, ShoppingBag, User, LayoutDashboard, LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../services/auth';

type NavLinkItem = { path: string; label: string; icon?: LucideIcon };

const defaultNavLinks: NavLinkItem[] = [
    { path: '/', label: 'Home' },
    { path: '/marketplace', label: 'Marketplace' },
];

const authNavLinks: NavLinkItem[] = [
    { path: '/ai-tools', label: 'AI Tools', icon: Sparkles },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const navLinks = user ? [...defaultNavLinks, ...authNavLinks] : defaultNavLinks;

    const handleLogOut = async () => {
        await logOut();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-warm-beige">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta to-saffron flex items-center justify-center shadow-lg group-hover:shadow-terracotta/30 transition-shadow">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-heading text-xl font-bold text-earth-brown leading-tight">
                            CraftConnect
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'text-terracotta'
                                        : 'text-earth-brown/70 hover:text-earth-brown hover:bg-warm-beige/50'
                                        }`}
                                >
                                    <span className="flex items-center gap-1.5">
                                        {link.icon && <link.icon className="w-4 h-4" />}
                                        {link.label}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navIndicator"
                                            className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-terracotta to-saffron rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            to="/marketplace"
                            className="p-2.5 rounded-xl text-earth-brown/60 hover:text-earth-brown hover:bg-warm-beige/50 transition-all"
                        >
                            <ShoppingBag className="w-5 h-5" />
                        </Link>
                        {user ? (
                            <div className="flex items-center gap-4 ml-2">
                                <Link to="/dashboard" className="flex items-center gap-2 group">
                                    <img
                                        src={user.photoURL || 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop&crop=face'}
                                        alt={user.displayName || 'User'}
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-warm-beige group-hover:ring-terracotta transition-all"
                                    />
                                    <span className="text-sm font-medium text-earth-brown hidden xl:block">
                                        {user.displayName?.split(' ')[0]}
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="p-2.5 rounded-xl text-earth-brown/60 hover:text-rust hover:bg-rust/5 transition-all"
                                    title="Sign Out"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-terracotta to-terracotta-light text-white rounded-xl font-medium text-sm shadow-lg shadow-terracotta/20 hover:shadow-terracotta/40 hover:scale-[1.02] transition-all duration-200"
                            >
                                <User className="w-4 h-4" />
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-xl text-earth-brown hover:bg-warm-beige/50 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-cream border-b border-warm-beige overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                            ? 'bg-terracotta/10 text-terracotta'
                                            : 'text-earth-brown/70 hover:bg-warm-beige/50'
                                            }`}
                                    >
                                        {link.icon && <link.icon className="w-4 h-4" />}
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <div className="pt-3 border-t border-warm-beige mt-2 flex flex-col gap-2">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-3 px-4 py-2">
                                            <img
                                                src={user.photoURL || 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop&crop=face'}
                                                alt={user.displayName || 'User'}
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-terracotta/20"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-earth-brown">{user.displayName}</span>
                                                <span className="text-xs text-earth-brown/50">{user.email}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                handleLogOut();
                                                setIsOpen(false);
                                            }}
                                            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-rust/10 text-rust rounded-xl font-medium text-sm hover:bg-rust/20 transition-all"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-terracotta to-terracotta-light text-white rounded-xl font-medium text-sm"
                                    >
                                        <User className="w-4 h-4" />
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
