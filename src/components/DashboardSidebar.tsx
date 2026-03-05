import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Sparkles,
    BarChart3,
    User,
    PenTool,
    Megaphone,
    Settings,
    LogOut,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logOut } from '../services/auth';

const menuItems = [
    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/products', label: 'My Products', icon: Package },
    { path: '/ai-tools', label: 'AI Story Generator', icon: PenTool },
    { path: '/ai-marketing', label: 'Marketing Assistant', icon: Megaphone },
    { path: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <aside className="w-64 bg-white border-r border-warm-beige min-h-screen sticky top-20 flex-shrink-0 hidden lg:block">
            <div className="p-6">
                {/* Artisan Info */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-warm-beige">
                    <img
                        src={user?.photoURL || 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100&h=100&fit=crop&crop=face'}
                        alt="Artisan"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-terracotta/20"
                    />
                    <div>
                        <p className="font-heading font-semibold text-earth-brown">{user?.displayName || 'Artisan'}</p>
                        <p className="text-xs text-earth-brown/50 capitalize">{user?.role || 'Pottery Artisan'}</p>
                    </div>
                </div>

                {/* Menu */}
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-terracotta/10 text-terracotta'
                                    : 'text-earth-brown/60 hover:text-earth-brown hover:bg-warm-beige/50'
                                    }`}
                            >
                                <item.icon className="w-4.5 h-4.5" />
                                {item.label}
                                {item.label === 'AI Story Generator' && (
                                    <span className="ml-auto flex items-center gap-0.5 px-1.5 py-0.5 bg-saffron/20 text-saffron-dark text-[10px] font-bold rounded-full">
                                        <Sparkles className="w-2.5 h-2.5" />
                                        AI
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="mt-8 pt-6 border-t border-warm-beige">
                    <button
                        onClick={handleLogOut}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-earth-brown/50 hover:text-rust transition-colors w-full rounded-xl hover:bg-rust/5"
                    >
                        <LogOut className="w-4.5 h-4.5" />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
