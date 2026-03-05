// ============================================================
// Firebase Storage Service
// Upload, download, and delete images/videos for products & profiles
// ============================================================

import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    listAll,
} from 'firebase/storage';
import { storage, isDemoMode } from './firebase';

// --- Demo image pool for demo mode ---
const DEMO_UPLOAD_URLS = [
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop',
];

let demoIndex = 0;

/**
 * Upload a product image to Firebase Storage
 * @returns The download URL of the uploaded image
 */
export async function uploadProductImage(
    artisanId: string,
    productId: string,
    file: File
): Promise<string> {
    if (isDemoMode) {
        console.log('[Demo] Uploaded product image:', file.name);
        // Return a demo image URL
        const url = DEMO_UPLOAD_URLS[demoIndex % DEMO_UPLOAD_URLS.length];
        demoIndex++;
        return url;
    }

    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage!, `products/${artisanId}/${productId}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
}

/**
 * Upload an artisan profile/gallery image
 * @returns The download URL of the uploaded image
 */
export async function uploadArtisanImage(
    artisanId: string,
    file: File,
    type: 'avatar' | 'gallery' = 'gallery'
): Promise<string> {
    if (isDemoMode) {
        console.log('[Demo] Uploaded artisan image:', type, file.name);
        const url = DEMO_UPLOAD_URLS[demoIndex % DEMO_UPLOAD_URLS.length];
        demoIndex++;
        return url;
    }

    const fileName = type === 'avatar'
        ? `avatar_${Date.now()}.${file.name.split('.').pop()}`
        : `gallery_${Date.now()}_${file.name}`;

    const storageRef = ref(storage!, `artisans/${artisanId}/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
}

/**
 * Delete an image from Firebase Storage by its URL
 */
export async function deleteImage(imageUrl: string): Promise<void> {
    if (isDemoMode) {
        console.log('[Demo] Deleted image:', imageUrl);
        return;
    }

    try {
        const storageRef = ref(storage!, imageUrl);
        await deleteObject(storageRef);
    } catch (error) {
        console.error('Failed to delete image:', error);
    }
}

/**
 * Get all images in a product folder
 */
export async function getProductImages(
    artisanId: string,
    productId: string
): Promise<string[]> {
    if (isDemoMode) {
        return DEMO_UPLOAD_URLS.slice(0, 2);
    }

    const folderRef = ref(storage!, `products/${artisanId}/${productId}`);
    const result = await listAll(folderRef);
    return Promise.all(result.items.map((item) => getDownloadURL(item)));
}

/**
 * Upload multiple files at once
 * @returns Array of download URLs
 */
export async function uploadMultipleImages(
    basePath: string,
    files: File[]
): Promise<string[]> {
    if (isDemoMode) {
        console.log(`[Demo] Uploaded ${files.length} images`);
        return files.map((_, i) => DEMO_UPLOAD_URLS[i % DEMO_UPLOAD_URLS.length]);
    }

    const uploadPromises = files.map(async (file) => {
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage!, `${basePath}/${fileName}`);
        const snapshot = await uploadBytes(storageRef, file);
        return getDownloadURL(snapshot.ref);
    });

    return Promise.all(uploadPromises);
}
