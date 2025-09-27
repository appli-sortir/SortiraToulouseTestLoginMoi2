"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";

// ✅ Logos sociaux avec react-icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaLinkedin, FaTwitter, FaSpotify, FaMicrosoft } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();

  // ----------- Connexion classique -----------
  const handleEmailLogin = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const q = query(collection(db, "identifiant"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Utilisateur non trouvé");
        setLoading(false);
        return;
      }

      const docSnap = querySnapshot.docs[0];
      const userData = docSnap.data();

      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (!passwordMatch) {
        setError("Mot de passe incorrect");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ uid: docSnap.id, identifiant: userData.identifiant, email: userData.email })
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la connexion");
      setLoading(false);
    }
  };

  // ----------- Connexion sociale -----------
  const handleSocialLogin = async (providerName: string) => {
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

      const docRef = doc(db, "identifiant", user.uid);
      const docSnap = await getDocs(query(collection(db, "identifiant"), where("email", "==", user.email)));

      if (docSnap.empty) {
        await setDoc(docRef, {
          identifiant: user.displayName || "Utilisateur",
          email: user.email,
          role: "Membre",
          genre: "Non défini",
          etudiant: false,
        });
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, identifiant: user.displayName || "Utilisateur", email: user.email })
      );

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur lors de la connexion sociale");
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleEmailLogin(
              formData.get("email") as string,
              formData.get("password") as string
            );
          }}
          className="space-y-4 mb-6"
        >
          {error && <p className="text-red-600">{error}</p>}
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" required />
          <input type="password" name="password" placeholder="Mot de passe" className="w-full p-2 border rounded" required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground mb-2">Ou connectez-vous avec</div>

        {/* Boutons sociaux */}
        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" onClick={() => handleSocialLogin("google")} className="flex items-center justify-center gap-2">
            <FcGoogle className="w-5 h-5" /> Google
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin("facebook")} className="flex items-center justify-center gap-2">
            <FaFacebook className="w-5 h-5 text-blue-600" /> Facebook
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin("apple")} className="flex items-center justify-center gap-2">
            <FaApple className="w-5 h-5" /> Apple
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin("linkedin")} className="flex items-center justify-center gap-2">
            <FaLinkedin className="w-5 h-5 text-blue-700" /> LinkedIn
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin("x")} className="flex items-center justify-center gap-2">
            <FaTwitter className="w-5 h-5 text-sky-500" /> X (Twitter)
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin("spotify")} className="flex items-center justify-center gap-2">
            <FaSpotify className="w-5 h-5 text-green-500" /> Spotify
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin("microsoft")} className="flex items-center justify-center gap-2">
            <FaMicrosoft className="w-5 h-5 text-blue-500" /> Microsoft / Outlook
          </Button>
        </div>
      </div>
    </div>
  );
}
