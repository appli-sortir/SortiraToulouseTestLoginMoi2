"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react"; // icônes génériques
import { FcGoogle } from "react-icons/fc";      // logo Google
import { FaFacebook, FaApple, FaLinkedin, FaTwitter, FaSpotify, FaMicrosoft } from "react-icons/fa"; // logos marques
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, doc, query, where, getDocs, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";

export default function RegisterPage() {
  const router = useRouter();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------
  // Inscription classique
  // ---------------------------
  const handleEmailRegister = async (data: {
    identifiant: string;
    email: string;
    password: string;
    genre: "Homme" | "Femme" | "Autre";
    majeur: boolean;
    etudiant: boolean;
  }) => {
    setLoading(true);
    setError("");

    try {
      const q = query(collection(db, "identifiant"), where("email", "==", data.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError("Cet email est déjà utilisé.");
        setLoading(false);
        return;
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUserRef = doc(collection(db, "identifiant"));
      await setDoc(newUserRef, {
        identifiant: data.identifiant,
        email: data.email,
        password: hashedPassword,
        genre: data.genre,
        majeur: data.majeur,
        etudiant: data.etudiant,
        role: "Membre",
      });

      localStorage.setItem(
        "user",
        JSON.stringify({ uid: newUserRef.id, identifiant: data.identifiant, email: data.email })
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // Inscription / connexion via provider social
  // ---------------------------
  const handleSocialRegister = async (providerName: string) => {
    setLoading(true);
    setError("");

    try {
      let provider: any;
      switch (providerName) {
        case "google": provider = new GoogleAuthProvider(); break;
        case "facebook": provider = new FacebookAuthProvider(); break;
        case "apple": provider = new OAuthProvider("apple.com"); break;
        case "linkedin": provider = new OAuthProvider("linkedin.com"); break;
        case "yahoo": provider = new OAuthProvider("yahoo.com"); break;
        case "x": provider = new OAuthProvider("twitter.com"); break;
        case "spotify": provider = new OAuthProvider("spotify.com"); break;
        case "microsoft": provider = new OAuthProvider("microsoft.com"); break;
        default: throw new Error("Provider inconnu");
      }

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user || !user.uid) throw new Error("Impossible de récupérer l'utilisateur");

      // Vérifier si l'utilisateur existe déjà
      const docRef = doc(db, "identifiant", user.uid);
      const q = query(collection(db, "identifiant"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Nouveau utilisateur -> créer Firestore
        await setDoc(docRef, {
          identifiant: user.displayName || "Utilisateur",
          email: user.email,
          role: "Membre",
          genre: "Non défini",
          etudiant: false,
          majeur: true,
        });
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, identifiant: user.displayName || "Utilisateur", email: user.email })
      );

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur lors de l'inscription sociale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Formulaire classique */}
        <RegisterForm onSubmit={handleEmailRegister} loading={loading} error={error} />

        <div className="text-center text-sm text-muted-foreground my-4">Ou inscrivez-vous avec</div>

        {/* Boutons sociaux */}
        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" onClick={() => handleSocialRegister("google")} className="flex items-center justify-center gap-2">
            <FcGoogle className="w-5 h-5" /> Google
          </Button>
          <Button variant="outline" onClick={() => handleSocialRegister("facebook")} className="flex items-center justify-center gap-2">
            <FaFacebook className="w-5 h-5 text-blue-600" /> Facebook
          </Button>
          <Button variant="outline" onClick={() => handleSocialRegister("apple")} className="flex items-center justify-center gap-2">
            <FaApple className="w-5 h-5" /> Apple
          </Button>
          <Button variant="outline" onClick={() => handleSocialRegister("linkedin")} className="flex items-center justify-center gap-2">
            <FaLinkedin className="w-5 h-5 text-blue-700" /> LinkedIn
          </Button>
          <Button variant="outline" onClick={() => handleSocialRegister("x")} className="flex items-center justify-center gap-2">
            <FaTwitter className="w-5 h-5 text-sky-500" /> X (Twitter)
          </Button>
          <Button variant="outline" onClick={() => handleSocialRegister("spotify")} className="flex items-center justify-center gap-2">
            <FaSpotify className="w-5 h-5 text-green-500" /> Spotify
          </Button>
          <Button variant="outline" onClick={() => handleSocialRegister("microsoft")} className="flex items-center justify-center gap-2">
            <FaMicrosoft className="w-5 h-5 text-blue-500" /> Microsoft / Outlook
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// RegisterForm adapté
// ---------------------------
function RegisterForm({ onSubmit, loading, error }: any) {
  const [identifiant, setIdentifiant] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [genre, setGenre] = useState<"Homme" | "Femme" | "Autre">("Homme");
  const [majeur, setMajeur] = useState(false);
  const [etudiant, setEtudiant] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ identifiant, email, password, genre, majeur, etudiant });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      {error && <p className="text-red-600">{error}</p>}

      <input type="text" placeholder="Identifiant" value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />

      <select value={genre} onChange={(e) => setGenre(e.target.value as any)} className="w-full p-2 border rounded">
        <option value="Homme">Homme</option>
        <option value="Femme">Femme</option>
        <option value="Autre">Autre</option>
      </select>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={majeur} onChange={(e) => setMajeur(e.target.checked)} /> Je confirme être majeur
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={etudiant} onChange={(e) => setEtudiant(e.target.checked)} /> Je suis étudiant
      </label>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Inscription..." : "S'inscrire"}
      </Button>
    </form>
  );
}
