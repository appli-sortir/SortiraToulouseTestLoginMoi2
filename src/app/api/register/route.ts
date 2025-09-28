import { NextResponse } from "next/server";
// ATTENTION : On n'importe plus 'auth' ni les fonctions de Firebase Auth.
import { db } from "@/lib/firebase"; 
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
// Réactivation de l'importation de bcryptjs pour le hachage sécurisé.
import bcrypt from "bcryptjs"; 

// Cette fonction gère la requête POST pour l'inscription.
export async function POST(req: Request) {
  try {
    const { identifiant, email, password, genre, majeur, etudiant } = await req.json();

    // 1. Validation de base
    if (!identifiant || !email || !password) {
      return NextResponse.json({ error: "L'identifiant, l'email et le mot de passe sont requis." }, { status: 400 });
    }
    
    // 2. Vérification de l'unicité de l'email (clé primaire)
    const usersRef = collection(db, "users");
    // On recherche un utilisateur existant avec cet email.
    const q = query(usersRef, where("email", "==", email));
    const existingUsers = await getDocs(q);

    if (!existingUsers.empty) {
        // 409 Conflict est approprié lorsqu'une ressource existe déjà
        return NextResponse.json({ error: "Cet email est déjà utilisé par un autre compte." }, { status: 409 }); 
    }

    // 3. Hachage du mot de passe avec bcrypt
    // NOTE: Il faut avoir installé 'bcryptjs' (npm install bcryptjs).
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 4. L'email est utilisé comme identifiant unique (UID) dans le document Firestore
    const uid = email;

    // 5. Création du document Firestore
    await setDoc(doc(db, "users", uid), {
      uid,
      identifiant,
      email,
      password: hashedPassword, // STOCKAGE du hachage
      role: "Membre",
      provider: "email",
      genre,
      majeur,
      etudiant,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Succès
    return NextResponse.json({ identifiant, email, uid }, { status: 200 });

  } catch (err: any) {
    console.error("Erreur lors de l'inscription API (Firestore):", err.message);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'inscription. Veuillez vérifier les logs." },
      { status: 500 }
    );
  }
}