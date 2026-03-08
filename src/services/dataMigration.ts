import { 
    createArtisanProfile, 
    createProduct, 
    getAllArtisans, 
    getAllProducts 
} from './firestore';
import { mockArtisans, mockProducts } from '../utils/mockData';

/**
 * Utility service to migrate mock data to a live Firestore instance.
 * This will only execute if the app is NOT in demo mode.
 */
export async function populateFirestoreWithMockData() {
    console.log('Starting Firestore population...');

    try {
        // 1. Check existing data to avoid duplicates (simplified check)
        const existingArtisans = await getAllArtisans();
        const existingProducts = await getAllProducts();

        console.log(`Found ${existingArtisans.length} existing artisans and ${existingProducts.length} products.`);

        // 2. Populate Artisans
        for (const artisan of mockArtisans) {
            // Check if artisan already exists by ID (demo logic uses artisan.id as userId)
            const exists = existingArtisans.some(a => a.userId === artisan.id);
            if (!exists) {
                console.log(`Creating artisan: ${artisan.name}`);
                await createArtisanProfile({
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
                });
            }
        }

        // 3. Populate Products
        for (const product of mockProducts) {
            const exists = existingProducts.some(p => p.name === product.name && p.artisanName === product.artisanName);
            if (!exists) {
                console.log(`Creating product: ${product.name}`);
                await createProduct({
                    artisanId: product.artisanId,
                    artisanName: product.artisanName,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    category: product.category,
                    images: product.images,
                    story: product.story,
                    materials: product.materials,
                    rating: product.rating,
                    reviews: product.reviews,
                    inStock: product.inStock,
                    featured: product.featured,
                });
            }
        }

        console.log('Firestore population completed successfully!');
        return { success: true, message: 'Data populated successfully' };
    } catch (error) {
        console.error('Error populating Firestore:', error);
        return { success: false, error };
    }
}
