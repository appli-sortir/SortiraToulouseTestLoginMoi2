// /src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ⚠️ Ces variables doivent être définies dans ton .env.local
// Exemple de .env.local :
// NEXT_PUBLIC_FIREBASE_API_KEY=xxxx
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxx.appspot.com
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx
// NEXT_PUBLIC_FIREBASE_APP_ID=xxxx

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// 🔹 On évite de réinitialiser Firebase plusieurs fois (bug sur Next.js hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 🔹 Firestore
export const db = getFirestore(app);

// 🔹 Authentification Firebase (utile pour login social Google, Facebook, etc.)
export const auth = getAuth(app);
