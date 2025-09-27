"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AdministrationPage() {
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Charger les utilisateurs depuis Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "identifiant"));
        const usersData = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setAllMembers(usersData);
      } catch (err) {
        console.error("Erreur lors du chargement des utilisateurs:", err);
        toast({
          title: "Erreur",
          description: "Impossible de charger les utilisateurs.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  // Changer rôle
  const handleRoleChange = async (memberId: string, newRole: string) => {
    try {
      const userRef = doc(db, "identifiant", memberId);
      await updateDoc(userRef, { role: newRole });

      setAllMembers((prev) =>
        prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
      );

      toast({ title: "Rôle mis à jour", description: "Le rôle a été modifié." });
    } catch (err) {
      console.error(err);
      toast({ title: "Erreur", description: "Impossible de modifier le rôle." });
    }
  };

  // Supprimer utilisateur
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "identifiant", id));
      setAllMembers((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Utilisateur supprimé", description: "Le compte a été supprimé." });
    } catch (err) {
      console.error(err);
      toast({ title: "Erreur", description: "Impossible de supprimer l'utilisateur." });
    }
  };

  // Archiver un membre
  const handleArchiveMember = async (member: any) => {
    try {
      await setDoc(doc(db, "archives", member.id), {
        ...member,
        archivedAt: new Date().toISOString(),
      });
      await deleteDoc(doc(db, "identifiant", member.id));
      setAllMembers((prev) => prev.filter((m) => m.id !== member.id));
      toast({ title: "Membre archivé", description: `${member.identifiant} a été archivé.` });
    } catch (err) {
      console.error(err);
      toast({ title: "Erreur", description: "Impossible d'archiver ce membre." });
    }
  };

  if (loading) {
    return <p className="p-4">Chargement des utilisateurs...</p>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Administration</h1>
      <p className="text-muted-foreground">
        Gérez les rôles, l’archivage et la suppression des utilisateurs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allMembers.map((member) => (
          <Card key={member.id} className="p-4">
            <CardHeader>
              <CardTitle>{member.identifiant}</CardTitle>
              <CardDescription>{member.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Rôle actuel :</p>
                <Select
                  value={member.role || "Membre"}
                  onValueChange={(value) => handleRoleChange(member.id, value)}
                >
                  <option value="Membre">Membre</option>
                  <option value="Modérateur">Modérateur</option>
                  <option value="Administrateur">Administrateur</option>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                >
                  Supprimer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleArchiveMember(member)}
                >
                  Archiver
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
