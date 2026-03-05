// ============================================================
// Firebase Admin SDK Initialization
// Shared across all Cloud Functions
// ============================================================

import * as admin from "firebase-admin";

// Initialize once — auto-detects credentials in Cloud Functions environment
if (!admin.apps.length) {
    admin.initializeApp();
}

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

// Project ID for Vertex AI
export const PROJECT_ID = process.env.GCLOUD_PROJECT || "solfinders-615c1";
export const LOCATION = "us-central1";
