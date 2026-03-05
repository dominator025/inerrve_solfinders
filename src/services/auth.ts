// ============================================================
// Firebase Authentication Service
// Handles signup, login, logout, Google OAuth, and user state
// ============================================================

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    updateProfile,
    type User,
    type UserCredential,
} from 'firebase/auth';
import { auth, isDemoMode } from './firebase';

// --- Types ---
export interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    role?: 'artisan' | 'buyer';
}

// Mock user for demo mode
const DEMO_USER: AuthUser = {
    uid: 'demo-artisan-001',
    email: 'lakshmi@craftconnect.ai',
    displayName: 'Lakshmi Devi',
    photoURL: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop&crop=face',
    role: 'artisan',
};

// --- Helper: Convert Firebase User → AuthUser ---
function mapFirebaseUser(user: User): AuthUser {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
    };
}

// --- Sign Up with Email & Password ---
export async function signUpWithEmail(
    email: string,
    password: string,
    displayName: string,
    role: 'artisan' | 'buyer' = 'artisan'
): Promise<AuthUser> {
    if (isDemoMode) {
        console.log('[Demo] Sign up:', { email, displayName, role });
        return { ...DEMO_USER, email, displayName, role };
    }

    const credential: UserCredential = await createUserWithEmailAndPassword(auth!, email, password);

    // Set display name
    await updateProfile(credential.user, { displayName });

    // Store role in Firestore (imported separately to avoid circular deps)
    const { createUserProfile } = await import('./firestore');
    await createUserProfile(credential.user.uid, { email, displayName, role });

    return { ...mapFirebaseUser(credential.user), role };
}

// --- Sign In with Email & Password ---
export async function signInWithEmail(
    email: string,
    password: string
): Promise<AuthUser> {
    if (isDemoMode) {
        console.log('[Demo] Sign in:', email);
        return DEMO_USER;
    }

    const credential = await signInWithEmailAndPassword(auth!, email, password);
    return mapFirebaseUser(credential.user);
}

// --- Sign In with Google ---
export async function signInWithGoogle(): Promise<AuthUser> {
    if (isDemoMode) {
        console.log('[Demo] Google sign in');
        return DEMO_USER;
    }

    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    const credential = await signInWithPopup(auth!, provider);

    // Create user profile if first time
    const { createUserProfile, getUserProfile } = await import('./firestore');
    const existing = await getUserProfile(credential.user.uid);
    if (!existing) {
        await createUserProfile(credential.user.uid, {
            email: credential.user.email || '',
            displayName: credential.user.displayName || '',
            role: 'buyer', // default, can be changed later
        });
    }

    return mapFirebaseUser(credential.user);
}

// --- Sign Out ---
export async function logOut(): Promise<void> {
    if (isDemoMode) {
        console.log('[Demo] Signed out');
        return;
    }
    await signOut(auth!);
}

// --- Auth State Listener ---
export function onAuthChange(callback: (user: AuthUser | null) => void): () => void {
    if (isDemoMode) {
        // In demo mode, simulate logged-in artisan
        setTimeout(() => callback(DEMO_USER), 100);
        return () => { };
    }

    return onAuthStateChanged(auth!, (firebaseUser) => {
        callback(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
    });
}

// --- Get Current User ---
export function getCurrentUser(): AuthUser | null {
    if (isDemoMode) return DEMO_USER;
    const user = auth?.currentUser;
    return user ? mapFirebaseUser(user) : null;
}
