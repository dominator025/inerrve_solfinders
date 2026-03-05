import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import ArtisanProfilePage from './pages/ArtisanProfilePage';
import ProductPage from './pages/ProductPage';
import CreateProductPage from './pages/CreateProductPage';
import AIStoryGeneratorPage from './pages/AIStoryGeneratorPage';
import AIMarketingPage from './pages/AIMarketingPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';

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
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
          <Route path="/marketplace" element={<AppLayout><MarketplacePage /></AppLayout>} />
          <Route path="/artisan/:id" element={<AppLayout><ArtisanProfilePage /></AppLayout>} />
          <Route path="/product/:id" element={<AppLayout><ProductPage /></AppLayout>} />

          {/* AI Tools */}
          <Route path="/ai-tools" element={<AppLayout><AIStoryGeneratorPage /></AppLayout>} />
          <Route path="/ai-marketing" element={<AppLayout><AIMarketingPage /></AppLayout>} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/dashboard/*" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="/create-product" element={<AppLayout><CreateProductPage /></AppLayout>} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
