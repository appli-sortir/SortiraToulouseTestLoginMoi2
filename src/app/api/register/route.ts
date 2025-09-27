// /src/pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db, auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { identifiant, email, password, genre, majeur, etudiant } = req.body;

  try {
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur dans Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Création du document Firestore
    await setDoc(doc(db, "identifiant", uid), {
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

    return res.status(200).json({ identifiant, email });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Erreur serveur" });
  }
}
