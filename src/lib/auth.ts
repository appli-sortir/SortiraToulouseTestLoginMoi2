import { db, auth } from "./firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
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

// Collection des utilisateurs
const usersCollection = "identifiant";

// ---------------------------
// Inscription email/password
// ---------------------------
export async function registerUserEmail(
  identifiant: string,
  email: string,
  password: string,
  role: string = "Membre",
  additionalFields: Record<string, any> = {}
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crée utilisateur dans Firebase Auth avec email
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // Crée document Firestore avec identifiant comme champ principal
  await setDoc(doc(db, usersCollection, uid), {
    identifiant,
    email,
    password: hashedPassword,
    role,
    provider: "email",
    ...additionalFields,
    createdAt: new Date()
  });

  return uid;
}

// ---------------------------
// Connexion par identifiant
// ---------------------------
export async function loginUserIdentifier(identifiant: string, password: string) {
  // Cherche l'utilisateur par identifiant
  const q = query(collection(db, usersCollection), where("identifiant", "==", identifiant));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error("Utilisateur non trouvé");
  }

  const docSnap = querySnapshot.docs[0];
  const userData = docSnap.data();

  // Vérification mot de passe
  const isPasswordValid = await bcrypt.compare(password, userData.password);
  if (!isPasswordValid) {
    throw new Error("Mot de passe incorrect");
  }

  // Connexion avec Firebase Auth via l’email lié
  const credential = await signInWithEmailAndPassword(auth, userData.email, password);

  return credential;
}

// ---------------------------
// Social login
// ---------------------------
export async function loginWithProvider(providerName: string) {
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

  const result: UserCredential = await signInWithPopup(auth, provider);
  const user = result.user;

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
// Déconnexion
// ---------------------------
export async function logoutUser() {
  await signOut(auth);
}

// ---------------------------
// Utilisateur courant
// ---------------------------
export function getCurrentUser() {
  return auth.currentUser;
}
