// ============================================================
// Cloud Functions Entry Point — CraftConnect AI
// Exports all HTTP functions and Firestore/Auth triggers
// ============================================================

// ─── Auth Triggers ────────────────────────────────────────────
export { onUserCreated } from "./auth/onCreate";

// ─── Artisan API ──────────────────────────────────────────────
export { createArtisan } from "./artisans/createArtisan";
export { getArtisan } from "./artisans/getArtisan";

// ─── Product API ──────────────────────────────────────────────
export { createProduct } from "./products/createProduct";
export { getProducts } from "./products/getProducts";

// ─── AI API (Vertex AI / Gemini) ──────────────────────────────
export { generateCraftStory } from "./ai/generateCraftStory";
export { generateProductDescription } from "./ai/generateProductDescription";
export { generateMarketingCaption } from "./ai/generateMarketingCaption";
