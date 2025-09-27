// /src/app/api/register/route.ts
import { NextResponse } from "next/server";
import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { identifiant, email, password, genre, majeur, etudiant } = await req.json();

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur dans Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Création du document Firestore
    await setDoc(doc(db, "users", uid), {
      identifiant,
      email,
      password: hashedPassword,
      role: "Membre",
      provider: "email",
      genre,
      majeur,
      etudiant,
      createdAt: new Date(),
    });

    return NextResponse.json({ identifiant, email }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
