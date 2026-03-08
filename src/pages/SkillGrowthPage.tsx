import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calculator, 
  Smartphone, 
  ShieldCheck, 
  TrendingUp, 
  Camera, 
  CreditCard, 
  Users, 
  ChevronRight, 
  Search,
  ExternalLink,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  lessons: { title: string; duration: string }[];
}

const ResourceCard = ({ title, description, icon: Icon, color, lessons }: ResourceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-warm-beige/20 hover:shadow-xl transition-all h-fit"
    >
      <div className={`p-6 ${color} flex items-start gap-4`}>
        <div className="p-3 rounded-2xl bg-white/20 text-white backdrop-blur-md border border-white/20">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-white/80 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-terracotta tracking-widest uppercase">{lessons.length} Lessons</span>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-earth-brown/40 hover:text-earth-brown transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-3 overflow-hidden"
            >
              {lessons.map((lesson, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-warm-beige/10 hover:bg-warm-beige/20 transition-colors group cursor-pointer">
                  <span className="text-sm font-medium text-earth-brown/80 group-hover:text-earth-brown">{lesson.title}</span>
                  <span className="text-xs text-earth-brown/40 font-mono italic">{lesson.duration}</span>
                </div>
              ))}
              <button className="w-full mt-4 py-3 bg-earth-brown text-white rounded-xl text-sm font-bold hover:bg-terracotta transition-colors flex items-center justify-center gap-2">
                Start Learning
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full py-3 border-2 border-warm-beige/30 text-earth-brown/60 rounded-xl text-sm font-bold hover:border-terracotta hover:text-terracotta transition-all"
          >
            Show Course Details
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default function SkillGrowthPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pricing Calculator State
  const [materialCost, setMaterialCost] = useState(0);
  const [laborHours, setLaborHours] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(250);
  const [profitMargin, setProfitMargin] = useState(20);

  const totalCost = materialCost + (laborHours * hourlyRate);
  const suggestedPrice = totalCost * (1 + profitMargin / 100);

  const businessResources = [
    {
      title: "Digital Marketplace 101",
      description: "Learn how to list your crafts and manage a professional online shop.",
      icon: TrendingUp,
      color: "bg-terracotta",
      lessons: [
        { title: "Setting up your Artisan profile", duration: "10m" },
        { title: "Writing product descriptions that sell", duration: "15m" },
        { title: "Inventory management for beginners", duration: "12m" }
      ]
    },
    {
      title: "Customer Magic",
      description: "Best practices for communicating with customers and building trust.",
      icon: Users,
      color: "bg-saffron",
      lessons: [
        { title: "Answering customer queries", duration: "8m" },
        { title: "Handling shipping and logistics", duration: "20m" },
        { title: "Asking for and managing reviews", duration: "10m" }
      ]
    }
  ];

  const techResources = [
    {
      title: "Photography Hacks",
      description: "Take stunning product photos using just your smartphone.",
      icon: Camera,
      color: "bg-deep-green",
      lessons: [
        { title: "Lighting your workspace for free", duration: "15m" },
        { title: "Composition: The 3 best angles", duration: "12m" },
        { title: "Simple editing on your phone", duration: "18m" }
      ]
    },
    {
      title: "Safe Digital Payments",
      description: "Everything you need to know about UPI, banking, and safe transactions.",
      icon: CreditCard,
      color: "bg-earth-brown",
      lessons: [
        { title: "Setting up your first UPI ID", duration: "10m" },
        { title: "Recognizing payment scams", duration: "15m" },
        { title: "Tracking your bank transfers", duration: "8m" }
      ]
    }
  ];

  const govSchemes = [
    {
      name: "PM Vishwakarma Scheme",
      desc: "Financial support and skill upgradation for traditional artisans and craftspeople.",
      link: "https://pmvishwakarma.gov.in/"
    },
    {
      name: "Artisan Identity Card",
      desc: "Official recognition as an Indian artisan with access to national fairs and health insurance.",
      link: "https://handicrafts.nic.in/"
    },
    {
      name: "Mudra Loan for Small Business",
      desc: "Low-interest loans up to ₹10 Lakhs to grow your workshop or buy materials.",
      link: "https://www.mudra.org.in/"
    }
  ];

  return (
    <div className="min-h-screen bg-warm-beige/20 pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-terracotta/10 text-terracotta px-4 py-2 rounded-full text-sm font-bold"
          >
            <BookOpen className="w-4 h-4" />
            Empowerment Hub
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold text-earth-brown"
          >
            Grow Your <span className="text-terracotta italic">Craft business</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-earth-brown/60 max-w-2xl mx-auto"
          >
            A dedicated learning space for CraftConnect artisans to master digital tools, pricing, and business growth.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-lg mx-auto"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-earth-brown/30 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search for a topic (e.g., pricing, photos)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white rounded-full shadow-lg shadow-earth-brown/5 border border-warm-beige/40 focus:outline-none focus:ring-2 focus:ring-terracotta/20 text-earth-brown"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Learning Paths */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Business Training */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-terracotta text-white rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-earth-brown">Business Training</h2>
                  <p className="text-earth-brown/40 text-sm">Master your online store</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businessResources.map((res, i) => (
                  <ResourceCard key={i} {...res} />
                ))}
              </div>
            </div>

            {/* Digital Literacy */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-deep-green text-white rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-earth-brown">Digital Literacy</h2>
                  <p className="text-earth-brown/40 text-sm">Use your phone for growth</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techResources.map((res, i) => (
                  <ResourceCard key={i} {...res} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Tool & Schemes */}
          <div className="space-y-8">
            
            {/* Smart Pricing Calculator */}
            <div className="bg-earth-brown text-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="w-6 h-6 text-saffron" />
                <h3 className="text-xl font-bold">Smart Pricing Tool</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Material Cost (₹)</label>
                  <input 
                    type="number" 
                    value={materialCost}
                    onChange={(e) => setMaterialCost(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-white/20 transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Labor (Hours)</label>
                  <input 
                    type="number" 
                    value={laborHours}
                    onChange={(e) => setLaborHours(Number(e.target.value))}
                    className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-white/20 transition-all font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Hourly Rate (₹)</label>
                    <input 
                      type="number" 
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:bg-white/20 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">Profit %</label>
                    <input 
                      type="number" 
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:bg-white/20 transition-all font-mono"
                    />
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Suggested Price</p>
                      <h4 className="text-4xl font-heading font-bold text-saffron">₹{Math.round(suggestedPrice)}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Profit ({profitMargin}%)</p>
                      <p className="text-xl font-mono text-deep-green">₹{Math.round(suggestedPrice - totalCost)}</p>
                    </div>
                  </div>
                  <div className="bg-saffron/10 p-4 rounded-2xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
                    <p className="text-sm text-white/60 italic">
                      This price covers your materials and time, plus a 20% margin for reinvestment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gov Schemes */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-warm-beige/40">
              <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="w-6 h-6 text-deep-green" />
                <h3 className="text-xl font-bold text-earth-brown">Govt. Support</h3>
              </div>
              <div className="space-y-4">
                {govSchemes.map((scheme, idx) => (
                  <a 
                    key={idx} 
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-2xl border border-warm-beige/40 hover:border-terracotta hover:bg-terracotta/5 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-earth-brown group-hover:text-terracotta transition-colors">{scheme.name}</h4>
                      <ExternalLink className="w-3 h-3 text-earth-brown/20 group-hover:text-terracotta" />
                    </div>
                    <p className="text-xs text-earth-brown/40 leading-relaxed">{scheme.desc}</p>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
