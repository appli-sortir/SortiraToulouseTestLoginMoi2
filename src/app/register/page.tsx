"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* 👉 ton RegisterForm fait déjà tout (formulaire + validation) */}
        <RegisterForm />
      </div>
    </div>
  );
}
