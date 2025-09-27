
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facebook, ExternalLink } from 'lucide-react';

const facebookGroups = [
  { name: 'Happy People Toulouse', url: 'https://www.facebook.com/groups/996796667051330/' },
  { name: 'Toulouse Le Bon Plan', url: 'https://www.facebook.com/groups/550741995050817/' },
  { name: 'Toulouse libre ou gratuit (proposer des sorties gratuit ou à prix libre)', url: 'https://www.facebook.com/groups/651831044888765/' },
  { name: 'Sorties Soirées Toulouse', url: 'https://www.facebook.com/groups/596757027131271/' },
  { name: 'La Carte des Colocs Toulouse', url: 'https://www.facebook.com/groups/1272971156117937/' },
  { name: 'Les Concerts Gratuits de Toulouse', url: 'https://www.facebook.com/groups/221534187648/' },
  { name: 'sorties culturelles à Toulouse', url: 'https://www.facebook.com/groups/513531158446053/' },
  { name: 'Sorties Visite Toulouse, Occitanie et Région Toulousaine', url: 'https://www.facebook.com/groups/546506525504472/' },
  { name: 'Soirées sorties entre filles Toulouse et Occitanie', url: 'https://www.facebook.com/groups/1397077878141492/' },
  { name: 'aller au théâtre, impro, stand up, spectacles, comédie à Toulouse', url: 'https://www.facebook.com/groups/1396560737927890/' },
];

export default function FacebookGroupsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
          <Facebook className="w-8 h-8" />
          Groupes Facebook
        </h1>
        <p className="text-muted-foreground mt-2">
          Découvrez une sélection de groupes Facebook pour trouver encore plus de sorties et d'activités à Toulouse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facebookGroups.map((group) => (
          <Card key={group.name} className="flex flex-col border-primary/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-primary/90">{group.name}</CardTitle>
            </CardHeader>
            <CardFooter className="mt-auto pt-0">
              <Button asChild className="w-full">
                <a href={group.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visiter le groupe
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
