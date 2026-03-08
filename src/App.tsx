import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ArtisansPage from './pages/ArtisansPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ArtisanProfilePage from './pages/ArtisanProfilePage';
import ProductPage from './pages/ProductPage';
import CreateProductPage from './pages/CreateProductPage';
import AIStoryGeneratorPage from './pages/AIStoryGeneratorPage';
import AIMarketingPage from './pages/AIMarketingPage';
import SkillGrowthPage from './pages/SkillGrowthPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
          {/* Public Pages */}
          <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
          <Route path="/marketplace" element={<AppLayout><MarketplacePage /></AppLayout>} />
          <Route path="/artisans" element={<AppLayout><ArtisansPage /></AppLayout>} />
          <Route path="/about" element={<AppLayout><AboutPage /></AppLayout>} />
          <Route path="/contact" element={<AppLayout><ContactPage /></AppLayout>} />
          <Route path="/artisan/:id" element={<AppLayout><ArtisanProfilePage /></AppLayout>} />
          <Route path="/product/:id" element={<AppLayout><ProductPage /></AppLayout>} />

          {/* AI Tools */}
          <Route path="/ai-tools" element={<AppLayout><AIStoryGeneratorPage /></AppLayout>} />
          <Route path="/ai-marketing" element={<AppLayout><AIMarketingPage /></AppLayout>} />
          <Route path="/skill-growth" element={<AppLayout><SkillGrowthPage /></AppLayout>} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/dashboard/*" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/create-product" element={<AppLayout><CreateProductPage /></AppLayout>} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}
