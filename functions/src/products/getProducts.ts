// ============================================================
// GET /products
// Lists all products with filtering, sorting, and pagination
// ============================================================

import { onRequest } from "firebase-functions/v2/https";
import { db } from "../config/firebase";
import { successResponse, errorResponse } from "../utils/response";

export const getProducts = onRequest(
    { cors: true, region: "us-central1" },
    async (req, res) => {
        if (req.method !== "GET") {
            errorResponse(res, "Method not allowed", 405);
            return;
        }

        try {
            const {
                category,
                artisanId,
                featured,
                sortBy = "createdAt",
                order = "desc",
                limit: limitStr = "20",
                offset: offsetStr = "0",
            } = req.query as Record<string, string>;

            const pageLimit = Math.min(parseInt(limitStr, 10) || 20, 100);
            const pageOffset = parseInt(offsetStr, 10) || 0;

            // Build query with filters
            let query: FirebaseFirestore.Query = db.collection("products");

            if (category) {
                query = query.where("category", "==", category);
            }

            if (artisanId) {
                query = query.where("artisanId", "==", artisanId);
            }

            if (featured === "true") {
                query = query.where("featured", "==", true);
            }

            // Sorting
            const validSortFields = ["createdAt", "price", "rating", "name"];
            const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
            const sortOrder = order === "asc" ? "asc" : "desc";
            query = query.orderBy(sortField, sortOrder as FirebaseFirestore.OrderByDirection);

            // Pagination
            query = query.offset(pageOffset).limit(pageLimit);

            const snapshot = await query.get();
            const products = snapshot.docs.map((doc) => ({
                productId: doc.id,
                ...doc.data(),
            }));

            // Get total count for pagination metadata
            let totalQuery: FirebaseFirestore.Query = db.collection("products");
            if (category) totalQuery = totalQuery.where("category", "==", category);
            if (artisanId) totalQuery = totalQuery.where("artisanId", "==", artisanId);
            if (featured === "true") totalQuery = totalQuery.where("featured", "==", true);

            const countSnapshot = await totalQuery.count().get();
            const totalCount = countSnapshot.data().count;

            successResponse(
                res,
                {
                    products,
                    pagination: {
                        total: totalCount,
                        limit: pageLimit,
                        offset: pageOffset,
                        hasMore: pageOffset + pageLimit < totalCount,
                    },
                },
                "Products fetched successfully"
            );
        } catch (error: unknown) {
            console.error("[getProducts] Error:", error);
            const message = error instanceof Error ? error.message : "Internal server error";
            errorResponse(res, "Failed to fetch products", 500, message);
        }
    }
);
