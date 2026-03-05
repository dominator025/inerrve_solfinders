// ============================================================
// Firestore Database Service
// CRUD operations for Users, Artisans, Products, and Orders
// ============================================================

import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    type QueryConstraint,
} from 'firebase/firestore';
import { db, isDemoMode } from './firebase';
import { mockArtisans, mockProducts, mockDashboardStats } from '../utils/mockData';

// ─── Types ───────────────────────────────────────────────────

export interface UserProfile {
    uid?: string;
    email: string;
    displayName: string;
    role: 'artisan' | 'buyer';
    photoURL?: string;
    phone?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
}

export interface ArtisanProfile {
    artisanId: string;
    userId: string;
    craftType: string;
    location: string;
    state: string;
    story: string;
    experience: number;
    gallery: string[];
    rating: number;
    productsCount: number;
    followers: number;
    createdAt?: unknown;
    updatedAt?: unknown;
}

export interface ProductData {
    productId?: string;
    id?: string;
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
    seoKeywords?: string[];
    createdAt?: unknown;
    updatedAt?: unknown;
}

// Alias for components that use the Product name
export type Product = ProductData;

export interface OrderData {
    orderId?: string;
    buyerId: string;
    productId: string;
    artisanId: string;
    productName: string;
    quantity: number;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress?: string;
    createdAt?: unknown;
    updatedAt?: unknown;
}

// ─── Collection References ───────────────────────────────────

const COLLECTIONS = {
    users: 'users',
    artisans: 'artisans',
    products: 'products',
    orders: 'orders',
} as const;

// ─── USER OPERATIONS ─────────────────────────────────────────

export async function createUserProfile(
    uid: string,
    data: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>
): Promise<void> {
    if (isDemoMode) {
        console.log('[Demo] Created user profile:', uid, data);
        return;
    }
    await setDoc(doc(db!, COLLECTIONS.users, uid), {
        ...data,
        uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    if (isDemoMode) {
        return {
            uid: 'demo-artisan-001',
            email: 'lakshmi@craftconnect.ai',
            displayName: 'Lakshmi Devi',
            role: 'artisan',
        };
    }
    const snap = await getDoc(doc(db!, COLLECTIONS.users, uid));
    return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(
    uid: string,
    data: Partial<UserProfile>
): Promise<void> {
    if (isDemoMode) {
        console.log('[Demo] Updated user profile:', uid, data);
        return;
    }
    await updateDoc(doc(db!, COLLECTIONS.users, uid), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

// ─── ARTISAN OPERATIONS ──────────────────────────────────────

export async function createArtisanProfile(
    data: Omit<ArtisanProfile, 'artisanId' | 'createdAt' | 'updatedAt'>
): Promise<string> {
    if (isDemoMode) {
        console.log('[Demo] Created artisan profile:', data);
        return 'demo-artisan-' + Date.now();
    }
    const docRef = await addDoc(collection(db!, COLLECTIONS.artisans), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function getArtisanProfile(artisanId: string): Promise<ArtisanProfile | null> {
    if (isDemoMode) {
        const artisan = mockArtisans.find((a) => a.id === artisanId);
        if (!artisan) return null;
        return {
            artisanId: artisan.id,
            userId: artisan.id,
            craftType: artisan.craftType,
            location: artisan.location,
            state: artisan.state,
            story: artisan.story,
            experience: artisan.experience,
            gallery: artisan.gallery,
            rating: artisan.rating,
            productsCount: artisan.productsCount,
            followers: artisan.followers,
        };
    }
    const snap = await getDoc(doc(db!, COLLECTIONS.artisans, artisanId));
    return snap.exists() ? ({ artisanId: snap.id, ...snap.data() } as ArtisanProfile) : null;
}

export async function getAllArtisans(): Promise<ArtisanProfile[]> {
    if (isDemoMode) {
        return mockArtisans.map((a) => ({
            artisanId: a.id,
            userId: a.id,
            craftType: a.craftType,
            location: a.location,
            state: a.state,
            story: a.story,
            experience: a.experience,
            gallery: a.gallery,
            rating: a.rating,
            productsCount: a.productsCount,
            followers: a.followers,
        }));
    }
    const snap = await getDocs(collection(db!, COLLECTIONS.artisans));
    return snap.docs.map((d) => ({ artisanId: d.id, ...d.data() }) as ArtisanProfile);
}

export async function updateArtisanProfile(
    artisanId: string,
    data: Partial<ArtisanProfile>
): Promise<void> {
    if (isDemoMode) {
        console.log('[Demo] Updated artisan:', artisanId, data);
        return;
    }
    await updateDoc(doc(db!, COLLECTIONS.artisans, artisanId), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

// ─── PRODUCT OPERATIONS ──────────────────────────────────────

export async function createProduct(
    data: Omit<ProductData, 'productId' | 'createdAt' | 'updatedAt'>
): Promise<string> {
    if (isDemoMode) {
        console.log('[Demo] Created product:', data);
        return 'demo-product-' + Date.now();
    }
    const docRef = await addDoc(collection(db!, COLLECTIONS.products), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function getProduct(productId: string): Promise<ProductData | null> {
    if (isDemoMode) {
        const product = mockProducts.find((p) => p.id === productId);
        return product ? { ...product, productId: product.id } : null;
    }
    const snap = await getDoc(doc(db!, COLLECTIONS.products, productId));
    return snap.exists() ? ({ productId: snap.id, ...snap.data() } as ProductData) : null;
}

export async function getAllProducts(filters?: {
    category?: string;
    artisanId?: string;
    featured?: boolean;
    maxPrice?: number;
    sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
    limitCount?: number;
}): Promise<ProductData[]> {
    if (isDemoMode) {
        let products = [...mockProducts];
        if (filters?.category) products = products.filter((p) => p.category === filters.category);
        if (filters?.artisanId) products = products.filter((p) => p.artisanId === filters.artisanId);
        if (filters?.featured) products = products.filter((p) => p.featured);
        if (filters?.maxPrice) products = products.filter((p) => p.price <= filters.maxPrice!);
        if (filters?.sortBy === 'price_asc') products.sort((a, b) => a.price - b.price);
        if (filters?.sortBy === 'price_desc') products.sort((a, b) => b.price - a.price);
        if (filters?.sortBy === 'rating') products.sort((a, b) => b.rating - a.rating);
        if (filters?.limitCount) products = products.slice(0, filters.limitCount);
        return products.map((p) => ({ ...p, productId: p.id }));
    }

    const constraints: QueryConstraint[] = [];
    if (filters?.category) constraints.push(where('category', '==', filters.category));
    if (filters?.artisanId) constraints.push(where('artisanId', '==', filters.artisanId));
    if (filters?.featured) constraints.push(where('featured', '==', true));
    if (filters?.sortBy === 'price_asc') constraints.push(orderBy('price', 'asc'));
    if (filters?.sortBy === 'price_desc') constraints.push(orderBy('price', 'desc'));
    if (filters?.sortBy === 'rating') constraints.push(orderBy('rating', 'desc'));
    if (filters?.sortBy === 'newest') constraints.push(orderBy('createdAt', 'desc'));
    if (filters?.limitCount) constraints.push(limit(filters.limitCount));

    const q = query(collection(db!, COLLECTIONS.products), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ productId: d.id, ...d.data() }) as ProductData);
}

export async function updateProduct(
    productId: string,
    data: Partial<ProductData>
): Promise<void> {
    if (isDemoMode) {
        console.log('[Demo] Updated product:', productId, data);
        return;
    }
    await updateDoc(doc(db!, COLLECTIONS.products, productId), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

export async function deleteProduct(productId: string): Promise<void> {
    if (isDemoMode) {
        console.log('[Demo] Deleted product:', productId);
        return;
    }
    await deleteDoc(doc(db!, COLLECTIONS.products, productId));
}

// ─── ORDER OPERATIONS ────────────────────────────────────────

export async function createOrder(
    data: Omit<OrderData, 'orderId' | 'createdAt' | 'updatedAt'>
): Promise<string> {
    if (isDemoMode) {
        console.log('[Demo] Created order:', data);
        return 'ORD-' + Date.now();
    }
    const docRef = await addDoc(collection(db!, COLLECTIONS.orders), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function getOrdersByBuyer(buyerId: string): Promise<OrderData[]> {
    if (isDemoMode) {
        return [
            {
                orderId: 'ORD-001',
                buyerId,
                productId: 'p1',
                artisanId: 'a1',
                productName: 'Blue Pottery Vase',
                quantity: 1,
                totalAmount: 2499,
                status: 'delivered',
            },
        ];
    }
    const q = query(
        collection(db!, COLLECTIONS.orders),
        where('buyerId', '==', buyerId),
        orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ orderId: d.id, ...d.data() }) as OrderData);
}

export async function getOrdersByArtisan(artisanId: string): Promise<OrderData[]> {
    if (isDemoMode) {
        return [
            {
                orderId: 'ORD-001',
                buyerId: 'buyer-001',
                productId: 'p1',
                artisanId,
                productName: 'Blue Pottery Vase',
                quantity: 1,
                totalAmount: 2499,
                status: 'delivered',
            },
            {
                orderId: 'ORD-002',
                buyerId: 'buyer-002',
                productId: 'p2',
                artisanId,
                productName: 'Rosewood Jewelry Box',
                quantity: 1,
                totalAmount: 3999,
                status: 'shipped',
            },
        ];
    }
    const q = query(
        collection(db!, COLLECTIONS.orders),
        where('artisanId', '==', artisanId),
        orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ orderId: d.id, ...d.data() }) as OrderData);
}

export async function updateOrderStatus(
    orderId: string,
    status: OrderData['status']
): Promise<void> {
    if (isDemoMode) {
        console.log('[Demo] Updated order status:', orderId, status);
        return;
    }
    await updateDoc(doc(db!, COLLECTIONS.orders, orderId), {
        status,
        updatedAt: serverTimestamp(),
    });
}

// ─── DASHBOARD STATS ─────────────────────────────────────────

export async function getDashboardStats(artisanId: string) {
    if (isDemoMode) {
        return mockDashboardStats;
    }

    // In production, aggregate from orders and analytics collections
    const orders = await getOrdersByArtisan(artisanId);
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalOrders = orders.length;

    return {
        totalViews: 0,    // would come from analytics
        totalLikes: 0,    // would come from likes collection
        totalOrders,
        totalRevenue,
        viewsChange: 0,
        likesChange: 0,
        ordersChange: 0,
        revenueChange: 0,
    };
}
