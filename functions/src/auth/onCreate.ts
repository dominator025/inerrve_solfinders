// ============================================================
// Auth Trigger: On User Created
// Auto-creates a user document in Firestore when a new user
// signs up via Firebase Authentication
// ============================================================

import { auth as authFunctions } from "firebase-functions/v2";
import { db } from "../config/firebase";

export const onUserCreated = authFunctions.user().onCreate(async (user) => {
    const { uid, email, displayName, photoURL } = user;

    const userData = {
        uid,
        name: displayName || "",
        email: email || "",
        role: "customer", // Default role; artisans upgrade via createArtisan
        profileImage: photoURL || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    try {
        await db.collection("users").doc(uid).set(userData);
        console.log(`[Auth] Created user document for ${uid} (${email})`);
    } catch (error) {
        console.error(`[Auth] Failed to create user document for ${uid}:`, error);
    }
});
