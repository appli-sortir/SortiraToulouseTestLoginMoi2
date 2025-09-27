"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ArchivesPage() {
  const [archivedMembers, setArchivedMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Charger les archives
  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "archives"));
        const data = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setArchivedMembers(data);
      } catch (err) {
        console.error("Erreur lors du chargement des archives:", err);
        toast({ title: "Erreur", description: "Impossible de charger les archives." });
      } finally {
        setLoading(false);
      }
    };

    fetchArchives();
  }, [toast]);

  // Supprimer définitivement
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "archives", id));
      setArchivedMembers((prev) => prev.filter((m) => m.id !== id));
      toast({ title: "Supprimé", description: "L'utilisateur a été définitivement supprimé." });
    } catch (err) {
      console.error(err);
      toast({ title: "Erreur", description: "Impossible de supprimer cet utilisateur." });
    }
  };

  if (loading) {
    return <p className="p-4">Chargement des archives...</p>;
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Membres archivés</h1>
      <p className="text-muted-foreground">
        Liste des utilisateurs archivés. Vous pouvez les supprimer définitivement.
      </p>

      {archivedMembers.length === 0 ? (
        <p className="text-muted-foreground">Aucun membre archivé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {archivedMembers.map((member) => (
            <Card key={member.id} className="p-4">
              <CardHeader>
                <CardTitle>{member.identifiant}</CardTitle>
                <CardDescription>{member.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Archivé le : {new Date(member.archivedAt).toLocaleDateString()}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                >
                  Supprimer définitivement
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
