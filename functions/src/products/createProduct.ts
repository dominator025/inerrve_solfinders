// ============================================================
// POST /createProduct
// Creates a product under an authenticated artisan
// ============================================================

import { onRequest } from "firebase-functions/v2/https";
import { db, auth } from "../config/firebase";
import { successResponse, errorResponse } from "../utils/response";
import {
    validateRequiredFields,
    isPositiveNumber,
    sanitizeString,
    isNonEmptyArray,
} from "../utils/validation";

export const createProduct = onRequest(
    { cors: true, region: "us-central1" },
    async (req, res) => {
        if (req.method !== "POST") {
            errorResponse(res, "Method not allowed", 405);
            return;
        }

        // Verify authentication
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            errorResponse(res, "Unauthorized: Missing or invalid token", 401);
            return;
        }

        try {
            const token = authHeader.split("Bearer ")[1];
            const decodedToken = await auth.verifyIdToken(token);
            const userId = decodedToken.uid;

            // Validate required fields
            const { artisanId, name, price, category, materials, images, description, story } =
                req.body;

            const missing = validateRequiredFields(req.body, [
                "artisanId",
                "name",
                "price",
                "category",
            ]);

            if (missing.length > 0) {
                errorResponse(res, `Missing required fields: ${missing.join(", ")}`);
                return;
            }

            if (!isPositiveNumber(price)) {
                errorResponse(res, "price must be a positive number");
                return;
            }

            // Verify artisan ownership
            const artisanDoc = await db.collection("artisans").doc(artisanId).get();
            if (!artisanDoc.exists) {
                errorResponse(res, "Artisan profile not found", 404);
                return;
            }

            if (artisanDoc.data()?.userId !== userId) {
                errorResponse(res, "You can only create products for your own artisan profile", 403);
                return;
            }

            // Create product
            const productData = {
                artisanId: sanitizeString(artisanId),
                artisanName: "", // Will be populated below
                name: sanitizeString(name),
                description: description ? sanitizeString(description, 10000) : "",
                price: Number(price),
                category: sanitizeString(category),
                materials: isNonEmptyArray(materials) ? materials.map(String) : [],
                story: story ? sanitizeString(story, 10000) : "",
                images: isNonEmptyArray(images) ? images.map(String) : [],
                rating: 0,
                reviews: 0,
                inStock: true,
                featured: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Get artisan's user name
            const userDoc = await db.collection("users").doc(userId).get();
            if (userDoc.exists) {
                productData.artisanName = userDoc.data()?.name || "";
            }

            const docRef = await db.collection("products").add(productData);

            // Increment artisan's product count
            const currentCount = artisanDoc.data()?.productsCount || 0;
            await db.collection("artisans").doc(artisanId).update({
                productsCount: currentCount + 1,
                updatedAt: new Date().toISOString(),
            });

            successResponse(
                res,
                { productId: docRef.id, ...productData },
                "Product created successfully",
                201
            );
        } catch (error: unknown) {
            console.error("[createProduct] Error:", error);
            const message = error instanceof Error ? error.message : "Internal server error";
            errorResponse(res, "Failed to create product", 500, message);
        }
    }
);
