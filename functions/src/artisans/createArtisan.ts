// ============================================================
// POST /createArtisan
// Creates an artisan profile linked to authenticated user
// ============================================================

import { onRequest } from "firebase-functions/v2/https";
import { db, auth } from "../config/firebase";
import { successResponse, errorResponse } from "../utils/response";
import { validateRequiredFields, isPositiveNumber, sanitizeString } from "../utils/validation";

export const createArtisan = onRequest(
    { cors: true, region: "us-central1" },
    async (req, res) => {
        // Only allow POST
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
            const { craftType, location, experienceYears, story } = req.body;
            const missing = validateRequiredFields(req.body, [
                "craftType",
                "location",
                "experienceYears",
            ]);

            if (missing.length > 0) {
                errorResponse(res, `Missing required fields: ${missing.join(", ")}`);
                return;
            }

            if (!isPositiveNumber(experienceYears)) {
                errorResponse(res, "experienceYears must be a positive number");
                return;
            }

            // Check if user already has an artisan profile
            const existingArtisan = await db
                .collection("artisans")
                .where("userId", "==", userId)
                .limit(1)
                .get();

            if (!existingArtisan.empty) {
                errorResponse(res, "User already has an artisan profile", 409);
                return;
            }

            // Create artisan profile
            const artisanData = {
                userId,
                craftType: sanitizeString(craftType),
                location: sanitizeString(location),
                experienceYears: Number(experienceYears),
                story: story ? sanitizeString(story, 10000) : "",
                galleryImages: [],
                rating: 0,
                productsCount: 0,
                followers: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const docRef = await db.collection("artisans").add(artisanData);

            // Update user role to 'artisan'
            await db.collection("users").doc(userId).update({
                role: "artisan",
                updatedAt: new Date().toISOString(),
            });

            successResponse(
                res,
                { artisanId: docRef.id, ...artisanData },
                "Artisan profile created successfully",
                201
            );
        } catch (error: unknown) {
            console.error("[createArtisan] Error:", error);
            const message = error instanceof Error ? error.message : "Internal server error";
            errorResponse(res, "Failed to create artisan profile", 500, message);
        }
    }
);
