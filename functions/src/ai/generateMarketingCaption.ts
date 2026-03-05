// ============================================================
// POST /generateMarketingCaption
// Uses Vertex AI (Gemini) to generate social media captions
// ============================================================

import { onRequest } from "firebase-functions/v2/https";
import { VertexAI } from "@google-cloud/vertexai";
import { PROJECT_ID, LOCATION } from "../config/firebase";
import { successResponse, errorResponse } from "../utils/response";
import { validateRequiredFields, sanitizeString } from "../utils/validation";

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const model = vertexAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateMarketingCaption = onRequest(
    { cors: true, region: "us-central1" },
    async (req, res) => {
        if (req.method !== "POST") {
            errorResponse(res, "Method not allowed", 405);
            return;
        }

        try {
            const { productName, craftType, platform } = req.body;

            const missing = validateRequiredFields(req.body, [
                "productName",
                "craftType",
            ]);

            if (missing.length > 0) {
                errorResponse(res, `Missing required fields: ${missing.join(", ")}`);
                return;
            }

            const targetPlatform = platform || "Instagram";

            const prompt = `You are a social media marketing expert for Indian handicraft brands.

Generate a catchy, engaging ${sanitizeString(targetPlatform)} caption for a handmade ${sanitizeString(productName)} created in the ${sanitizeString(craftType)} tradition.

The caption should:
- Be 50-100 words
- Include 2-3 relevant emojis
- Have a strong hook in the first line
- Mention "handmade" and "artisan" naturally
- Include a call-to-action (shop now, link in bio, etc.)
- Add 5-8 relevant hashtags at the end

Hashtag suggestions should include: #Handmade #IndianCrafts #MadeInIndia #ArtisanMade
${targetPlatform === "Instagram" ? "Optimize for Instagram's algorithm and engagement." : ""}
${targetPlatform === "Facebook" ? "Make it conversational and shareable." : ""}
${targetPlatform === "Twitter" ? "Keep it concise and punchy, under 280 characters." : ""}`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const caption = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (!caption) {
                errorResponse(res, "AI failed to generate caption. Please try again.", 502);
                return;
            }

            successResponse(
                res,
                {
                    caption: caption.trim(),
                    productName,
                    craftType,
                    platform: targetPlatform,
                    generatedAt: new Date().toISOString(),
                },
                "Marketing caption generated successfully"
            );
        } catch (error: unknown) {
            console.error("[generateMarketingCaption] Error:", error);
            const message = error instanceof Error ? error.message : "AI service error";
            errorResponse(res, "Failed to generate marketing caption", 500, message);
        }
    }
);
