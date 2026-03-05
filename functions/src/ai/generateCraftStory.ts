// ============================================================
// POST /generateCraftStory
// Uses Vertex AI (Gemini) to generate emotional craft stories
// ============================================================

import { onRequest } from "firebase-functions/v2/https";
import { VertexAI } from "@google-cloud/vertexai";
import { PROJECT_ID, LOCATION } from "../config/firebase";
import { successResponse, errorResponse } from "../utils/response";
import { validateRequiredFields, sanitizeString } from "../utils/validation";

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const model = vertexAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateCraftStory = onRequest(
    { cors: true, region: "us-central1" },
    async (req, res) => {
        if (req.method !== "POST") {
            errorResponse(res, "Method not allowed", 405);
            return;
        }

        try {
            const { craftType, location, materials, experienceYears } = req.body;

            const missing = validateRequiredFields(req.body, [
                "craftType",
                "location",
            ]);

            if (missing.length > 0) {
                errorResponse(res, `Missing required fields: ${missing.join(", ")}`);
                return;
            }

            // Build the prompt
            const materialsText = Array.isArray(materials)
                ? materials.join(", ")
                : materials || "traditional materials";

            const experienceText = experienceYears
                ? `with ${experienceYears} years of experience`
                : "";

            const prompt = `You are a cultural storyteller specializing in Indian handicrafts and artisan heritage.

Generate an emotional, vivid, and culturally rich story about an Indian artisan practicing ${sanitizeString(craftType)} in ${sanitizeString(location)} ${experienceText}.

The artisan works with ${materialsText}.

The story should:
- Be 200-300 words long
- Mention the heritage, tradition, and cultural significance of the craft
- Include sensory details (sights, sounds, textures)
- Convey the artisan's passion and dedication
- Reference the region's cultural identity
- Feel authentic and respectful to Indian craft traditions

Write in third person, present tense. Make it compelling for a marketplace audience.`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const story = response.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (!story) {
                errorResponse(res, "AI failed to generate story. Please try again.", 502);
                return;
            }

            successResponse(
                res,
                {
                    story: story.trim(),
                    craftType,
                    location,
                    generatedAt: new Date().toISOString(),
                },
                "Craft story generated successfully"
            );
        } catch (error: unknown) {
            console.error("[generateCraftStory] Error:", error);
            const message = error instanceof Error ? error.message : "AI service error";
            errorResponse(res, "Failed to generate craft story", 500, message);
        }
    }
);
