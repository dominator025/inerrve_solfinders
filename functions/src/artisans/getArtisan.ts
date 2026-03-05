// ============================================================
// GET /artisan/{artisanId}
// Returns artisan profile details + their products
// ============================================================

import { onRequest } from "firebase-functions/v2/https";
import { db } from "../config/firebase";
import { successResponse, errorResponse } from "../utils/response";

export const getArtisan = onRequest(
    { cors: true, region: "us-central1" },
    async (req, res) => {
        if (req.method !== "GET") {
            errorResponse(res, "Method not allowed", 405);
            return;
        }

        try {
            // Extract artisanId from query or path
            const artisanId = req.query.artisanId as string || req.path.split("/").pop();

            if (!artisanId) {
                errorResponse(res, "artisanId is required");
                return;
            }

            // Fetch artisan profile
            const artisanDoc = await db.collection("artisans").doc(artisanId).get();

            if (!artisanDoc.exists) {
                errorResponse(res, "Artisan not found", 404);
                return;
            }

            const artisanData = { artisanId: artisanDoc.id, ...artisanDoc.data() };

            // Fetch artisan's user profile for name/email
            const userId = artisanDoc.data()?.userId;
            let userProfile = null;
            if (userId) {
                const userDoc = await db.collection("users").doc(userId).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    userProfile = {
                        name: userData?.name,
                        email: userData?.email,
                        profileImage: userData?.profileImage,
                    };
                }
            }

            // Fetch artisan's products
            const productsSnapshot = await db
                .collection("products")
                .where("artisanId", "==", artisanId)
                .orderBy("createdAt", "desc")
                .limit(50)
                .get();

            const products = productsSnapshot.docs.map((doc) => ({
                productId: doc.id,
                ...doc.data(),
            }));

            successResponse(
                res,
                {
                    artisan: artisanData,
                    user: userProfile,
                    products,
                    productsCount: products.length,
                },
                "Artisan profile fetched successfully"
            );
        } catch (error: unknown) {
            console.error("[getArtisan] Error:", error);
            const message = error instanceof Error ? error.message : "Internal server error";
            errorResponse(res, "Failed to fetch artisan profile", 500, message);
        }
    }
);
