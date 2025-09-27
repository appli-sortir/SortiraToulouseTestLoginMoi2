import { db, auth } from "./firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signOut,
  UserCredential
} from "firebase/auth";
import bcrypt from "bcryptjs";

// Nom de la collection pour tes utilisateurs
const usersCollection = "identifiant";

// ---------------------------
// 📌 Création utilisateur email/password
// ---------------------------
export async function registerUserEmail(
  email: string,
  password: string,
  pseudo: string,
  role: string = "Membre",
  additionalFields: Record<string, any> = {}
) {
  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création dans Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // Création dans Firestore
  await setDoc(doc(db, usersCollection, uid), {
    email,
    pseudo,
    password: hashedPassword, // On ne stocke jamais le mot de passe en clair
    role,
    ...additionalFields,
    createdAt: new Date()
  });

  return uid;
}

// ---------------------------
// 📌 Connexion utilisateur email/password
// ---------------------------
export async function loginUserEmail(email: string, password: string) {
  const q = doc(db, usersCollection, email);
  const docSnap = await getDoc(q);

  if (!docSnap.exists()) {
    throw new Error("Utilisateur non trouvé");
  }

  const userData = docSnap.data();

  // Vérification du mot de passe
  const isPasswordValid = await bcrypt.compare(password, userData.password);
  if (!isPasswordValid) {
    throw new Error("Mot de passe incorrect");
  }

  // Connexion avec Firebase Auth
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential;
}

// ---------------------------
// 📌 Login social
// ---------------------------
export async function loginWithProvider(providerName: string) {
  let provider:
    | GoogleAuthProvider
    | FacebookAuthProvider
    | OAuthProvider
    | TwitterAuthProvider
    | GithubAuthProvider;

  switch (providerName.toLowerCase()) {
    case "google":
      provider = new GoogleAuthProvider();
      break;
    case "facebook":
      provider = new FacebookAuthProvider();
      break;
    case "microsoft":
      provider = new OAuthProvider("microsoft.com");
      break;
    case "apple":
      provider = new OAuthProvider("apple.com");
      break;
    case "linkedin":
      provider = new OAuthProvider("linkedin.com");
      break;
    case "yahoo":
      provider = new OAuthProvider("yahoo.com");
      break;
    case "x":
    case "twitter":
      provider = new TwitterAuthProvider();
      break;
    case "spotify":
      provider = new OAuthProvider("spotify.com");
      break;
    default:
      throw new Error("Provider inconnu");
  }

  const result: UserCredential = await signInWithPopup(auth, provider);
  const user = result.user;

  // Vérification / création dans Firestore
  const userRef = doc(db, usersCollection, user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      pseudo: user.displayName || "Nouvel utilisateur",
      role: "Membre",
      provider: providerName.toLowerCase(),
      createdAt: new Date()
    });
  }

  return result;
}

// ---------------------------
// 📌 Déconnexion (fonction existante)
// ---------------------------
export async function logoutUser() {
  await signOut(auth);
}

// ---------------------------
// 📌 Ajouts pour layout.tsx
// ---------------------------

// Récupérer l’utilisateur courant
export function getCurrentUser() {
  return auth.currentUser;
}

// Alias pour compatibilité avec ton layout
export async function logout() {
  await signOut(auth);
}
