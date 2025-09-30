import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; 
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { identifiant, email, password, genre, majeur, etudiant } = await req.json();

    if (!identifiant || !email || !password) {
      return NextResponse.json({ error: "Identifiant, email et mot de passe requis." }, { status: 400 });
    }

    const usersRef = collection(db, "identifiant");

    const q1 = query(usersRef, where("identifiant", "==", identifiant));
    const existingIdentifiant = await getDocs(q1);
    if (!existingIdentifiant.empty) return NextResponse.json({ error: "Cet identifiant est déjà utilisé." }, { status: 409 });

    const q2 = query(usersRef, where("email", "==", email));
    const existingEmail = await getDocs(q2);
    if (!existingEmail.empty) return NextResponse.json({ error: "Cet email est déjà utilisé." }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const uid = Date.now(); // ou nanoid()

    await setDoc(doc(db, "identifiant", String(uid)), {
      uid,
      identifiant,
      email,
      password: hashedPassword,
      role: "Membre",
      provider: "email",
      genre,
      majeur,
      etudiant,
      photoURL: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true, uid, identifiant, email }, { status: 200 });

  } catch (err: any) {
    console.error("Erreur register API:", err);
    return NextResponse.json({ error: "Erreur serveur lors de l'inscription." }, { status: 500 });
  }
}
