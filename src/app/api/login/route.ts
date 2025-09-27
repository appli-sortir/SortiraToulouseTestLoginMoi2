// /src/pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { identifiant, password } = req.body;

  try {
    const q = query(collection(db, "identifiant"), where("identifiant", "==", identifiant));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const docSnap = querySnapshot.docs[0];
    const userData = docSnap.data();

    const isValid = await bcrypt.compare(password, userData.password);
    if (!isValid) return res.status(401).json({ error: "Mot de passe incorrect" });

    // Connexion Firebase via email
    await signInWithEmailAndPassword(auth, userData.email, password);

    return res.status(200).json({ identifiant: userData.identifiant, email: userData.email });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Erreur serveur" });
  }
}
