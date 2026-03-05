// ============================================================
// POST /generateProductDescription
// Uses Vertex AI (Gemini) to generate compelling product descriptions
// ============================================================

import { onRequest } from "firebase-functions/v2/https";
import { VertexAI } from "@google-cloud/vertexai";
import { PROJECT_ID, LOCATION } from "../config/firebase";
import { successResponse, errorResponse } from "../utils/response";
import { validateRequiredFields, sanitizeString } from "../utils/validation";

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const model = vertexAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateProductDescription = onRequest(
    { cors: true, region: "us-central1" },
    async (req, res) => {
        if (req.method !== "POST") {
            errorResponse(res, "Method not allowed", 405);
            return;
        }

        try {
            const { productName, materials, craftType } = req.body;

            const missing = validateRequiredFields(req.body, [
                "productName",
                "craftType",
            ]);

            if (missing.length > 0) {
                errorResponse(res, `Missing required fields: ${missing.join(", ")}`);
                return;
            }

            const materialsText = Array.isArray(materials)
                ? materials.join(", ")
                : materials || "traditional materials";

            const prompt = `You are an expert copywriter for a premium Indian handicrafts marketplace.

Write a compelling product description for a handmade ${sanitizeString(productName)} made using ${materialsText} in the traditional ${sanitizeString(craftType)} style.

The description should:
- Be 100-150 words
- Highlight the handmade quality and artisan craftsmanship
- Mention the materials and techniques used
- Appeal to buyers who value authenticity and cultural heritage
- Include sensory language (texture, color, feel)
- End with a subtle call-to-action

Write in second person. Make it feel premium and authentic.`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const description =
                response.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (!description) {
                errorResponse(res, "AI failed to generate description. Please try again.", 502);
                return;
            }

            successResponse(
                res,
                {
                    description: description.trim(),
                    productName,
                    craftType,
                    generatedAt: new Date().toISOString(),
                },
                "Product description generated successfully"
            );
        } catch (error: unknown) {
            console.error("[generateProductDescription] Error:", error);
            const message = error instanceof Error ? error.message : "AI service error";
            errorResponse(res, "Failed to generate product description", 500, message);
        }
    }
);
