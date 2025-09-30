"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Lien retour accueil */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Formulaire de connexion */}
        <LoginForm />
      </div>
    </div>
  );
}
