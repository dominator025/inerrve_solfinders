import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../services/auth';

export default function LoginPage() {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<'artisan' | 'buyer'>('artisan');

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isSignUp) {
                if (!name || !email || !password) throw new Error('Please fill all fields');
                await signUpWithEmail(email, password, name, role);
            } else {
                if (!email || !password) throw new Error('Please enter email and password');
                await signInWithEmail(email, password);
            }
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to authenticate');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        setLoading(true);
        try {
            await signInWithGoogle();
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Failed to authenticate with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cream via-warm-beige-light to-warm-beige flex items-center justify-center pt-20 pb-16 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-terracotta to-saffron flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                    </Link>
                    <h1 className="font-heading text-2xl font-bold text-earth-brown">
                        {isSignUp ? 'Join CraftConnect AI' : 'Welcome Back'}
                    </h1>
                    <p className="text-sm text-earth-brown/60 mt-1">
                        {isSignUp
                            ? 'Start your journey to share your craft with the world'
                            : 'Sign in to access your dashboard and AI tools'}
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-warm-beige/50">
                    {error && (
                        <div className="mb-4 p-3 bg-rust/10 border border-rust/20 rounded-xl text-rust text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Role Selector (Sign Up only) */}
                    {isSignUp && (
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-earth-brown mb-2">I am a...</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setRole('artisan')}
                                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${role === 'artisan'
                                        ? 'bg-terracotta/10 border-terracotta text-terracotta'
                                        : 'border-warm-beige text-earth-brown/60 hover:border-terracotta/30'
                                        }`}
                                >
                                    🎨 Artisan
                                </button>
                                <button
                                    onClick={() => setRole('buyer')}
                                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${role === 'buyer'
                                        ? 'bg-terracotta/10 border-terracotta text-terracotta'
                                        : 'border-warm-beige text-earth-brown/60 hover:border-terracotta/30'
                                        }`}
                                >
                                    🛍️ Buyer
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                            <div>
                                <label className="block text-sm font-medium text-earth-brown mb-1.5">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown/30" />
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-earth-brown mb-1.5">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown/30" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-earth-brown mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-brown/30" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 bg-warm-beige/20 rounded-xl border border-warm-beige focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none text-earth-brown placeholder:text-earth-brown/40 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-earth-brown/30 hover:text-earth-brown/60"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-terracotta to-terracotta-light text-white rounded-xl font-semibold shadow-lg shadow-terracotta/20 hover:shadow-terracotta/40 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:hover:scale-100"
                        >
                            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
                            {!loading && <ArrowRight className="w-5 h-5" />}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-warm-beige" />
                        <span className="text-xs text-earth-brown/40 font-medium">OR</span>
                        <div className="flex-1 h-px bg-warm-beige" />
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-warm-beige rounded-xl font-medium text-earth-brown hover:bg-warm-beige/30 transition-colors disabled:opacity-70"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Toggle */}
                    <p className="text-center text-sm text-earth-brown/60 mt-6">
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError(null);
                            }}
                            className="text-terracotta font-semibold hover:underline"
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
