import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { identifiant, password } = await req.json();

    if (!identifiant || !password) {
      return NextResponse.json({ error: "Identifiant et mot de passe requis." }, { status: 400 });
    }

    const usersRef = collection(db, "identifiant");

    // Cherche par identifiant OU email
    let q = query(usersRef, where("identifiant", "==", identifiant));
    let snap = await getDocs(q);

    if (snap.empty) {
      q = query(usersRef, where("email", "==", identifiant));
      snap = await getDocs(q);
    }

    if (snap.empty) {
      return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    }

    const userDoc = snap.docs[0];
    const userData = userDoc.data();

    const isValid = await bcrypt.compare(password, userData.password);
    if (!isValid) {
      return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    }

    const { password: _, ...userInfo } = userData;
    return NextResponse.json({ success: true, user: userInfo }, { status: 200 });

  } catch (err: any) {
    console.error("Erreur login API:", err);
    return NextResponse.json({ error: "Erreur serveur lors de la connexion." }, { status: 500 });
  }
}
