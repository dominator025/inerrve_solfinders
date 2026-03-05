import { motion } from 'framer-motion';
import { Eye, Heart, ShoppingBag, IndianRupee, Sparkles, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar';
import StatCard from '../components/StatCard';
import { mockDashboardStats, mockProducts } from '../utils/mockData';

export default function DashboardPage() {
    const stats = mockDashboardStats;

    const recentOrders = [
        { id: 'ORD-001', product: 'Blue Pottery Vase', buyer: 'Anita S.', amount: 2499, status: 'Delivered', date: '2 Mar' },
        { id: 'ORD-002', product: 'Rosewood Jewelry Box', buyer: 'Pradeep K.', amount: 3999, status: 'Shipped', date: '1 Mar' },
        { id: 'ORD-003', product: 'Terracotta Cup Set', buyer: 'Sneha M.', amount: 1299, status: 'Processing', date: '28 Feb' },
        { id: 'ORD-004', product: 'Blue Pottery Vase', buyer: 'Rahul T.', amount: 2499, status: 'Delivered', date: '27 Feb' },
    ];

    const statusColors: Record<string, string> = {
        Delivered: 'bg-deep-green/10 text-deep-green',
        Shipped: 'bg-saffron/10 text-saffron-dark',
        Processing: 'bg-terracotta/10 text-terracotta',
    };

    return (
        <div className="min-h-screen bg-cream pt-20">
            <div className="flex">
                <DashboardSidebar />

                <main className="flex-1 p-6 lg:p-8">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between mb-8"
                    >
                        <div>
                            <h1 className="font-heading text-2xl md:text-3xl font-bold text-earth-brown">Dashboard</h1>
                            <p className="text-earth-brown/60">Welcome back, Lakshmi! Here's your craft business overview.</p>
                        </div>
                        <Link
                            to="/ai-tools"
                            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-terracotta to-terracotta-light text-white rounded-xl font-medium shadow-lg shadow-terracotta/20 hover:shadow-terracotta/40 transition-all text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            New Product
                        </Link>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard
                            title="Total Views"
                            value={stats.totalViews}
                            change={stats.viewsChange}
                            icon={Eye}
                            color="bg-gradient-to-br from-terracotta to-terracotta-light"
                            index={0}
                        />
                        <StatCard
                            title="Total Likes"
                            value={stats.totalLikes}
                            change={stats.likesChange}
                            icon={Heart}
                            color="bg-gradient-to-br from-saffron to-gold"
                            index={1}
                        />
                        <StatCard
                            title="Total Orders"
                            value={stats.totalOrders}
                            change={stats.ordersChange}
                            icon={ShoppingBag}
                            color="bg-gradient-to-br from-deep-green to-deep-green-light"
                            index={2}
                        />
                        <StatCard
                            title="Revenue"
                            value={`₹${stats.totalRevenue.toLocaleString()}`}
                            change={stats.revenueChange}
                            icon={IndianRupee}
                            color="bg-gradient-to-br from-earth-brown to-earth-brown-light"
                            index={3}
                        />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Recent Orders */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-warm-beige/50"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-warm-beige/50">
                                <h2 className="font-heading text-lg font-semibold text-earth-brown">Recent Orders</h2>
                                <button className="text-sm text-terracotta font-medium hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-xs text-earth-brown/50 uppercase">
                                            <th className="text-left px-6 py-3">Order ID</th>
                                            <th className="text-left px-6 py-3">Product</th>
                                            <th className="text-left px-6 py-3">Buyer</th>
                                            <th className="text-left px-6 py-3">Amount</th>
                                            <th className="text-left px-6 py-3">Status</th>
                                            <th className="text-left px-6 py-3">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOrders.map((order) => (
                                            <tr key={order.id} className="border-t border-warm-beige/30 hover:bg-warm-beige/10 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-earth-brown">{order.id}</td>
                                                <td className="px-6 py-4 text-sm text-earth-brown/70">{order.product}</td>
                                                <td className="px-6 py-4 text-sm text-earth-brown/70">{order.buyer}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-earth-brown">₹{order.amount.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-earth-brown/50">{order.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* AI Tools Quick Access */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl p-6 shadow-md border border-warm-beige/50"
                        >
                            <h2 className="font-heading text-lg font-semibold text-earth-brown mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-terracotta" />
                                AI Tools
                            </h2>
                            <div className="space-y-3">
                                {[
                                    { label: 'Generate Craft Story', link: '/ai-tools', icon: '📖' },
                                    { label: 'Marketing Captions', link: '/ai-marketing', icon: '📢' },
                                    { label: 'Product Descriptions', link: '/ai-tools', icon: '📝' },
                                ].map((tool) => (
                                    <Link
                                        key={tool.label}
                                        to={tool.link}
                                        className="flex items-center justify-between px-4 py-3 bg-warm-beige/20 rounded-xl hover:bg-terracotta/5 transition-colors group"
                                    >
                                        <span className="flex items-center gap-2 text-sm font-medium text-earth-brown">
                                            <span>{tool.icon}</span>
                                            {tool.label}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-earth-brown/30 group-hover:text-terracotta transition-colors" />
                                    </Link>
                                ))}
                            </div>

                            {/* Top Products */}
                            <h3 className="font-heading text-base font-semibold text-earth-brown mt-6 mb-3">Top Products</h3>
                            <div className="space-y-3">
                                {mockProducts.slice(0, 3).map((product) => (
                                    <div key={product.id} className="flex items-center gap-3">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-earth-brown truncate">{product.name}</p>
                                            <p className="text-xs text-earth-brown/50">₹{product.price.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
