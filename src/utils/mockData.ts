export interface Artisan {
    id: string;
    name: string;
    craftType: string;
    location: string;
    state: string;
    story: string;
    experience: number;
    avatar: string;
    gallery: string[];
    rating: number;
    productsCount: number;
    followers: number;
}

export interface Product {
    id: string;
    artisanId: string;
    artisanName: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    images: string[];
    story: string;
    materials: string[];
    rating: number;
    reviews: number;
    inStock: boolean;
    featured: boolean;
}

export interface DashboardStats {
    totalViews: number;
    totalLikes: number;
    totalOrders: number;
    totalRevenue: number;
    viewsChange: number;
    likesChange: number;
    ordersChange: number;
    revenueChange: number;
}

export const mockArtisans: Artisan[] = [
    {
        id: 'a1',
        name: 'Lakshmi Devi',
        craftType: 'Pottery',
        location: 'Jaipur',
        state: 'Rajasthan',
        story: 'For five generations, my family has shaped clay into vessels that carry both water and our cultural legacy. Each piece I create echoes the pink city sunsets that inspired my grandmother\'s first pottery wheel.',
        experience: 25,
        avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face',
        gallery: [
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=400&fit=crop',
        ],
        rating: 4.9,
        productsCount: 34,
        followers: 1250,
    },
    {
        id: 'a2',
        name: 'Ravi Kumar',
        craftType: 'Woodcraft',
        location: 'Saharanpur',
        state: 'Uttar Pradesh',
        story: 'I learned woodcarving from my father when I was just seven. Every stroke of the chisel tells a story of patience and devotion. My rosewood boxes have traveled to homes across 15 countries.',
        experience: 30,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
        gallery: [
            '/ravi-woodcraft.png',
            'https://images.unsplash.com/photo-1611486212557-88be5ff027dc?w=600&h=400&fit=crop',
        ],
        rating: 4.8,
        productsCount: 28,
        followers: 980,
    },
    {
        id: 'a3',
        name: 'Meera Patel',
        craftType: 'Handloom',
        location: 'Ahmedabad',
        state: 'Gujarat',
        story: 'Patola silk weaving is an art that demands years of dedication. I weave dreams into fabric, with patterns that have been passed down for centuries through my family\'s legacy in Patan.',
        experience: 18,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
        gallery: [
            'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&h=400&fit=crop',
        ],
        rating: 4.9,
        productsCount: 42,
        followers: 2100,
    },
    {
        id: 'a4',
        name: 'Abdul Rashid',
        craftType: 'Embroidery',
        location: 'Lucknow',
        state: 'Uttar Pradesh',
        story: 'Chikankari embroidery is the heartbeat of Lucknow. My needle dances on muslin fabric creating intricate patterns that Mughal emperors once cherished. Each stitch is a meditation in itself.',
        experience: 22,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
        gallery: [
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=400&fit=crop',
        ],
        rating: 4.7,
        productsCount: 56,
        followers: 1800,
    },
    {
        id: 'a5',
        name: 'Priya Sharma',
        craftType: 'Jewelry',
        location: 'Jaipur',
        state: 'Rajasthan',
        story: 'Kundan and Meenakari jewelry making runs in my veins. I transform raw stones and metals into wearable art that celebrates Indian heritage with every sparkle and color.',
        experience: 15,
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face',
        gallery: [
            '/priya-jewelry.jpg',
        ],
        rating: 4.8,
        productsCount: 63,
        followers: 3200,
    },
    {
        id: 'a6',
        name: 'Sunita Kumari',
        craftType: 'Painting',
        location: 'Madhubani',
        state: 'Bihar',
        story: 'Madhubani paintings are more than art—they are prayers on paper. My mother taught me to paint stories of gods, nature, and love using natural colors from flowers and bark.',
        experience: 20,
        avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop&crop=face',
        gallery: [
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop',
        ],
        rating: 4.9,
        productsCount: 38,
        followers: 2800,
    },
];

export const mockProducts: Product[] = [
    {
        id: 'p1',
        artisanId: 'a1',
        artisanName: 'Lakshmi Devi',
        name: 'Blue Pottery Vase — Floral Motif',
        description: 'A stunning handcrafted blue pottery vase featuring traditional Rajasthani floral motifs. Made using age-old techniques passed down through generations, this piece brings the warmth of Indian heritage into your home.',
        price: 2499,
        originalPrice: 3499,
        category: 'pottery',
        images: [
            'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop',
        ],
        story: 'This vase was inspired by the blue tiles of Jaipur\'s City Palace. Each flower painted on it represents a blessing for the home it adorns.',
        materials: ['Clay', 'Natural dyes', 'Quartz stone powder'],
        rating: 4.8,
        reviews: 124,
        inStock: true,
        featured: true,
    },
    {
        id: 'p2',
        artisanId: 'a2',
        artisanName: 'Ravi Kumar',
        name: 'Rosewood Carved Jewelry Box',
        description: 'Exquisite hand-carved rosewood jewelry box with intricate floral and geometric patterns. A perfect blend of utility and artistry from the master woodcarvers of Saharanpur.',
        price: 3999,
        originalPrice: 5499,
        category: 'woodcraft',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
        ],
        story: 'Carved from a single block of aged rosewood, this box took 15 days to complete. Each pattern tells a story of the forests of Uttarakhand.',
        materials: ['Rosewood', 'Brass hinges', 'Velvet lining'],
        rating: 4.9,
        reviews: 87,
        inStock: true,
        featured: true,
    },
    {
        id: 'p3',
        artisanId: 'a3',
        artisanName: 'Meera Patel',
        name: 'Patola Silk Dupatta — Double Ikat',
        description: 'Authentic Patan Patola silk dupatta woven using the ancient double ikat technique. Each piece takes approximately 4-6 months to weave, making it a true collector\'s item.',
        price: 15999,
        originalPrice: 22000,
        category: 'handloom',
        images: [
            'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop',
        ],
        story: 'This dupatta carries 700 years of Gujarati weaving tradition. The geometric patterns symbolize prosperity and good fortune.',
        materials: ['Pure silk', 'Natural dyes', 'Gold zari thread'],
        rating: 5.0,
        reviews: 45,
        inStock: true,
        featured: true,
    },
    {
        id: 'p4',
        artisanId: 'a4',
        artisanName: 'Abdul Rashid',
        name: 'Chikankari Anarkali Kurta',
        description: 'Elegantly hand-embroidered Chikankari Anarkali kurta on fine muslin fabric. Features intricate shadow work and tepchi stitches that showcase the finest Lucknowi craftsmanship.',
        price: 4599,
        category: 'embroidery',
        images: [
            'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop',
        ],
        story: 'Each Chikankari piece is a labor of love, taking 20 days of meticulous hand embroidery. This kurta features 32 different types of traditional stitches.',
        materials: ['Muslin fabric', 'Cotton thread', 'Natural wash'],
        rating: 4.7,
        reviews: 156,
        inStock: true,
        featured: false,
    },
    {
        id: 'p5',
        artisanId: 'a5',
        artisanName: 'Priya Sharma',
        name: 'Kundan Meenakari Necklace Set',
        description: 'Magnificent Kundan Meenakari necklace set featuring uncut polki diamonds set in pure gold-plated silver. The reverse side showcases beautiful Meenakari enamel work in vibrant colors.',
        price: 8999,
        originalPrice: 12999,
        category: 'jewelry',
        images: [
            'https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=600&h=600&fit=crop',
        ],
        story: 'This necklace draws inspiration from Mughal-era royal jewelry. Each stone is hand-set using traditional lac filling technique perfected over centuries.',
        materials: ['Gold-plated silver', 'Kundan stones', 'Meenakari enamel', 'Pearls'],
        rating: 4.8,
        reviews: 203,
        inStock: true,
        featured: true,
    },
    {
        id: 'p6',
        artisanId: 'a6',
        artisanName: 'Sunita Kumari',
        name: 'Madhubani Tree of Life Painting',
        description: 'Original Madhubani painting depicting the sacred Tree of Life, symbolizing the connection between earth and heaven. Painted using natural colors on handmade paper.',
        price: 5499,
        category: 'painting',
        images: [
            'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
        ],
        story: 'The Tree of Life is a sacred symbol in Mithila culture. This painting uses colors derived from turmeric, indigo, flowers, and charcoal — just as my ancestors did.',
        materials: ['Handmade paper', 'Natural pigments', 'Bamboo pen'],
        rating: 4.9,
        reviews: 67,
        inStock: true,
        featured: true,
    },
    {
        id: 'p7',
        artisanId: 'a1',
        artisanName: 'Lakshmi Devi',
        name: 'Terracotta Tea Cup Set (6 pieces)',
        description: 'Set of 6 handcrafted terracotta tea cups with traditional Rajasthani designs. Each cup is kiln-fired and food-safe, bringing an earthy elegance to your tea time.',
        price: 1299,
        originalPrice: 1899,
        category: 'pottery',
        images: [
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop',
        ],
        story: 'Tea tastes different in clay cups — my grandmother always said it carries the flavor of the earth. These cups are shaped to cool your chai to the perfect temperature.',
        materials: ['Terracotta clay', 'Natural glaze', 'Food-safe coating'],
        rating: 4.6,
        reviews: 289,
        inStock: true,
        featured: false,
    },
    {
        id: 'p8',
        artisanId: 'a2',
        artisanName: 'Ravi Kumar',
        name: 'Handcarved Wooden Wall Panel',
        description: 'Ornate hand-carved wooden wall panel featuring traditional Indian mandala designs. Perfect as a statement piece for living rooms or entryways.',
        price: 12999,
        category: 'woodcraft',
        images: [
            'https://images.unsplash.com/photo-1611486212557-88be5ff027dc?w=600&h=600&fit=crop',
        ],
        story: 'This mandala panel took 45 days of continuous carving. The design represents the cosmos and the unity of all life — a meditation captured in wood.',
        materials: ['Teak wood', 'Hand tools', 'Natural oil finish'],
        rating: 4.9,
        reviews: 34,
        inStock: true,
        featured: false,
    },
];

export const mockDashboardStats: DashboardStats = {
    totalViews: 12458,
    totalLikes: 3847,
    totalOrders: 156,
    totalRevenue: 485600,
    viewsChange: 12.5,
    likesChange: 8.3,
    ordersChange: 15.2,
    revenueChange: 22.1,
};

export const mockCulturalStories = [
    {
        id: 'cs1',
        title: 'The Living Art of Madhubani',
        region: 'Bihar',
        excerpt: 'Born from the walls of ancient Mithila homes, Madhubani painting transforms everyday surfaces into vibrant tapestries of mythology and nature.',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=400&fit=crop',
    },
    {
        id: 'cs2',
        title: 'The Blue Pottery of Jaipur',
        region: 'Rajasthan',
        excerpt: 'A craft born from Turko-Persian roots, Jaipur\'s blue pottery uses no clay — only quartz stone powder, glass, and multani mitti create its distinctive turquoise beauty.',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=400&fit=crop',
    },
    {
        id: 'cs3',
        title: 'Kashmiri Pashmina — The Diamond Fiber',
        region: 'Kashmir',
        excerpt: 'Woven from the finest cashmere wool of Changthangi goats, each Pashmina shawl represents months of painstaking handwork in the valleys of Kashmir.',
        image: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&h=400&fit=crop',
    },
];
