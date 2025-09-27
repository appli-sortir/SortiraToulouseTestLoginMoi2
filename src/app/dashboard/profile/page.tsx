
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function ProfilePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Default profile values - would normally be fetched from a database.
  const [profile, setProfile] = useState({
    pseudo: 'user',
    nom: 'Dupont',
    prenom: 'Jean',
    description: "Passionné de randonnée et de cuisine, j'aime découvrir de nouveaux paysages et de nouvelles saveurs. Toujours partant pour une bonne discussion autour d'un café !",
    ville: 'Toulouse',
    departement: 'Haute-Garonne',
    region: 'Occitanie',
    pays: 'France',
    telephone: '0612345678',
    email: 'jean.dupont@email.com',
    genre: 'homme',
    langues_parlees: 'Français, Anglais',
    etudiant: false,
    accueillant: true,
    vegetarien: false,
    vegan: false,
    cherche_emploi: false,
    cherche_logement: false,
    cherche_covoiturage: false,
    sport: 'Randonnée, Vélo',
    musique: 'Jazz, Rock',
    jeux: 'Échecs, Jeux de société',
    cuisine: 'Cuisine italienne',
    danse: 'Salsa',
    loisirs_divers: 'Photographie',
    film: 'Science-fiction',
    programmes_tele: 'Documentaires',
    livres: 'Romans historiques',
    voyages: 'Europe',
    animaux: 'Chiens',
    jaime: 'Les longues balades',
    jenaimepas: 'Les embouteillages',
    environnement: 'Montagne',
    centres_interets: 'Astronomie',
    profilePicture: null as string | null,
  });

  const [preview, setPreview] = useState<string | null>(profile.profilePicture);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        // In a real app, you'd upload the file and save the URL
        setProfile(prev => ({ ...prev, profilePicture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };
  
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setProfile(prev => ({...prev, [id]: checked}));
  };

  const handleSelectChange = (id: string, value: string) => {
     setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulation d'une mise à jour réseau
    setTimeout(() => {
      setIsLoading(false);
      console.log('Profil sauvegardé:', profile);
      toast({
        title: 'Profil mis à jour !',
        description: 'Vos informations ont été enregistrées avec succès.',
      });
    }, 1500);
  };
  
  const getDefaultAvatar = (gender: string) => {
      if (gender === 'femme') return 'https://firebasestorage.googleapis.com/v0/b/tolosaamicalstudio.firebasestorage.app/o/sortiratoulouse%2Favatardefaut-f.png?alt=media&token=8d21c0ac-3375-4d0a-9e7c-4860d5b41d4c';
      return 'https://firebasestorage.googleapis.com/v0/b/tolosaamicalstudio.firebasestorage.app/o/sortiratoulouse%2Favatardefaut-h.png?alt=media&token=b7f97805-f215-4a25-a433-87588147d33b';
  }

  const currentAvatar = preview || getDefaultAvatar(profile.genre);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Mon Profil</CardTitle>
          <CardDescription>
            Mettez à jour vos informations. Seul votre pseudo sera visible par les autres membres.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
        
          {/* Section: Photo de profil */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold text-lg text-primary flex items-center gap-2">
                <UserCircle className="w-6 h-6" />
                Photo de profil
            </h3>
             <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
                    <AvatarImage src={currentAvatar} alt="Photo de profil" />
                    <AvatarFallback className="text-4xl">
                        {profile.pseudo.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                    <Label htmlFor="profile-picture">Changer de photo</Label>
                    <Input id="profile-picture" type="file" accept="image/*" onChange={handlePictureChange} />
                    <p className="text-xs text-muted-foreground">Votre photo sera redimensionnée. Si aucune photo n'est choisie, un avatar par défaut sera utilisé.</p>
                </div>
            </div>
          </div>
        
          {/* Section: Informations personnelles */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold text-lg text-primary">Informations Personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pseudo">Pseudo *</Label>
                <Input id="pseudo" value={profile.pseudo} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" value={profile.prenom} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={profile.nom} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input id="email" type="email" value={profile.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" type="tel" value={profile.telephone} onChange={handleChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select value={profile.genre} onValueChange={(value) => handleSelectChange('genre', value)}>
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Sélectionner..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homme">Homme</SelectItem>
                    <SelectItem value="femme">Femme</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                    <SelectItem value="non-specifie">Non spécifié</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ville">Ville</Label>
                <Input id="ville" value={profile.ville} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="departement">Département</Label>
                <Input id="departement" value={profile.departement} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Région</Label>
                <Input id="region" value={profile.region} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pays">Pays</Label>
                <Input id="pays" value={profile.pays} onChange={handleChange} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="langues_parlees">Langues parlées</Label>
                <Input id="langues_parlees" value={profile.langues_parlees} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Section: Statut et Préférences */}
          <div className="space-y-4 p-4 border rounded-lg">
             <h3 className="font-semibold text-lg text-primary">Statut & Préférences</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center space-x-2">
                    <Checkbox id="etudiant" checked={profile.etudiant} onCheckedChange={(checked) => handleCheckboxChange('etudiant', !!checked)} />
                    <Label htmlFor="etudiant">Étudiant(e)</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="accueillant" checked={profile.accueillant} onCheckedChange={(checked) => handleCheckboxChange('accueillant', !!checked)} />
                    <Label htmlFor="accueillant">Accueillant(e)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="vegetarien" checked={profile.vegetarien} onCheckedChange={(checked) => handleCheckboxChange('vegetarien', !!checked)} />
                    <Label htmlFor="vegetarien">Végétarien(ne)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="vegan" checked={profile.vegan} onCheckedChange={(checked) => handleCheckboxChange('vegan', !!checked)} />
                    <Label htmlFor="vegan">Végan(e)</Label>
                </div>
             </div>
          </div>
          
           {/* Section: Recherches */}
          <div className="space-y-4 p-4 border rounded-lg">
             <h3 className="font-semibold text-lg text-primary">Je cherche...</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                    <Checkbox id="cherche_emploi" checked={profile.cherche_emploi} onCheckedChange={(checked) => handleCheckboxChange('cherche_emploi', !!checked)} />
                    <Label htmlFor="cherche_emploi">Un emploi</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="cherche_logement" checked={profile.cherche_logement} onCheckedChange={(checked) => handleCheckboxChange('cherche_logement', !!checked)} />
                    <Label htmlFor="cherche_logement">Un logement</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="cherche_covoiturage" checked={profile.cherche_covoiturage} onCheckedChange={(checked) => handleCheckboxChange('cherche_covoiturage', !!checked)} />
                    <Label htmlFor="cherche_covoiturage">Un covoiturage</Label>
                </div>
             </div>
          </div>

          {/* Section: Centres d'intérêt */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold text-lg text-primary">Centres d'intérêt</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2"><Label htmlFor="sport">Sport</Label><Input id="sport" value={profile.sport} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="musique">Musique</Label><Input id="musique" value={profile.musique} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="jeux">Jeux</Label><Input id="jeux" value={profile.jeux} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="cuisine">Cuisine</Label><Input id="cuisine" value={profile.cuisine} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="danse">Danse</Label><Input id="danse" value={profile.danse} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="loisirs_divers">Loisirs divers</Label><Input id="loisirs_divers" value={profile.loisirs_divers} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="film">Film</Label><Input id="film" value={profile.film} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="programmes_tele">Programmes télé</Label><Input id="programmes_tele" value={profile.programmes_tele} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="livres">Livres</Label><Input id="livres" value={profile.livres} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="voyages">Voyages</Label><Input id="voyages" value={profile.voyages} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="animaux">Animaux</Label><Input id="animaux" value={profile.animaux} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="jaime">J'aime</Label><Input id="jaime" value={profile.jaime} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="jenaimepas">Je n'aime pas</Label><Input id="jenaimepas" value={profile.jenaimepas} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="environnement">Environnement</Label><Input id="environnement" value={profile.environnement} onChange={handleChange} /></div>
                <div className="space-y-2"><Label htmlFor="centres_interets">Autres centres d'intérêts</Label><Input id="centres_interets" value={profile.centres_interets} onChange={handleChange} /></div>
            </div>
          </div>
          
          {/* Section: Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-lg font-semibold text-primary">À propos de moi</Label>
            <Textarea
              id="description"
              value={profile.description}
              onChange={handleChange}
              placeholder="Parlez un peu de vous..."
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Sauvegarde...</span>
              </>
            ) : (
              'Enregistrer les modifications'
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

    