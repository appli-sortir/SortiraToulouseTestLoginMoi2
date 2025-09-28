import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs"; 

// Cette fonction gère la requête POST pour la connexion (Login).
export async function POST(req: Request) {
  try {
    const { identifiant, password } = await req.json(); // L'identifiant est l'email

    // 1. Validation de base
    if (!identifiant || !password) {
      return NextResponse.json({ error: "L'email et le mot de passe sont requis." }, { status: 400 });
    }
    
    // 2. Recherche de l'utilisateur par email dans Firestore
    const usersRef = collection(db, "users");
    // L'identifiant est supposé être l'email
    const q = query(usersRef, where("email", "==", identifiant));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
        // Retourne un message générique pour ne pas révéler si l'email existe ou non
        return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 }); 
    }

    // Un seul document devrait correspondre à l'email
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    const hashedPassword = userData.password; // Mot de passe haché stocké

    // 3. Comparaison du mot de passe en clair avec le hachage stocké
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
        // Mot de passe incorrect
        return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
    }
    
    // 4. Succès de la connexion
    // Dans une application réelle, vous généreriez ici un jeton de session sécurisé (JWT) 
    // ou vous configuriez un cookie de session.
    
    // On retire le mot de passe avant de retourner les données
    const { password: _, ...userInfo } = userData; 

    return NextResponse.json({ success: true, user: userInfo }, { 
        status: 200,
        // Envisager ici de définir un cookie de session sécurisé (HttpOnly, Secure)
    });

  } catch (err: any) {
    console.error("Erreur lors de la connexion API (Firestore):", err.message);
    return NextResponse.json(
      { error: "Erreur serveur lors de la connexion. Veuillez vérifier les logs." },
      { status: 500 }
    );
  }
}