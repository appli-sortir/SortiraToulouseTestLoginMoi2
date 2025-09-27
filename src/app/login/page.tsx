"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaLinkedin, FaTwitter, FaSpotify, FaMicrosoft } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { loginUserEmail, loginWithProvider } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ----------- Connexion classique (identifiant + mot de passe) -----------
  const handleLogin = async (identifiant: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      await loginUserEmail(identifiant, password);

      // Stockage local
      localStorage.setItem(
        "user",
        JSON.stringify({ identifiant })
      );

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  // ----------- Connexion sociale -----------
  const handleSocialLogin = async (providerName: string) => {
    setLoading(true);
    setError("");

    try {
      const result = await loginWithProvider(providerName);
      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify({ identifiant: user.displayName || "Utilisateur", email: user.email })
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
            handleLogin(
              formData.get("identifiant") as string,
              formData.get("password") as string
            );
          }}
          className="space-y-4 mb-6"
        >
          {error && <p className="text-red-600">{error}</p>}
          <input type="text" name="identifiant" placeholder="Identifiant" className="w-full p-2 border rounded" required />
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
