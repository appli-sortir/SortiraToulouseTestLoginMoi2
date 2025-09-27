"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (identifiant: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifiant, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erreur lors de la connexion");

      // Enregistrer l'utilisateur côté client
      localStorage.setItem("user", JSON.stringify({ identifiant: data.identifiant, email: data.email }));

      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleLogin(formData.get("identifiant") as string, formData.get("password") as string);
          }}
          className="space-y-4 mb-6"
        >
          {error && <p className="text-red-600">{error}</p>}

          <input
            type="text"
            name="identifiant"
            placeholder="Identifiant"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="w-full p-2 border rounded"
            required
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          Pas encore de compte?{" "}
          <Link href="/register" className="underline text-primary">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
