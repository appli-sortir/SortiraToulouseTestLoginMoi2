// /src/lib/auth.ts
import { auth, db } from "./firebase";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, TwitterAuthProvider, GithubAuthProvider, signOut, UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// ---------------------------
// Social login
// ---------------------------
export async function loginWithProvider(providerName: string): Promise<UserCredential> {
  let provider:
    | GoogleAuthProvider
    | FacebookAuthProvider
    | OAuthProvider
    | TwitterAuthProvider
    | GithubAuthProvider;

  switch (providerName.toLowerCase()) {
    case "google": provider = new GoogleAuthProvider(); break;
    case "facebook": provider = new FacebookAuthProvider(); break;
    case "microsoft": provider = new OAuthProvider("microsoft.com"); break;
    case "apple": provider = new OAuthProvider("apple.com"); break;
    case "linkedin": provider = new OAuthProvider("linkedin.com"); break;
    case "yahoo": provider = new OAuthProvider("yahoo.com"); break;
    case "x":
    case "twitter": provider = new TwitterAuthProvider(); break;
    case "spotify": provider = new OAuthProvider("spotify.com"); break;
    default: throw new Error("Provider inconnu");
  }

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const userRef = doc(db, "identifiant", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      identifiant: user.displayName || "Nouvel utilisateur",
      role: "Membre",
      provider: providerName.toLowerCase(),
      createdAt: new Date(),
    });
  }

  return result;
}

// ---------------------------
// Déconnexion
// ---------------------------
export async function logout() {
  await signOut(auth);
}

// ---------------------------
// Utilisateur courant
// ---------------------------
export function getCurrentUser() {
  return auth.currentUser;
}
