'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Shield,
  Calendar,
  CalendarCheck,
  User,
  MessageSquare,
  Facebook,
  LifeBuoy,
  ArrowRight,
  ExternalLink,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { ImageMosaic } from '@/components/image-mosaic';

// Exemple de règles (à remplacer plus tard par user Firestore)
const userRole = 'Modérateur'; 
const isFemale = true; 
const isStudent = false; 

const canSeeAdmin = userRole === 'Administrateur' || userRole === 'Modérateur';
const canSeeGirlsOutings = canSeeAdmin || isFemale;
const canSeeStudentOutings = canSeeAdmin || isStudent;

export default function DashboardPage() {
  const { toggleSidebar, isMobile } = useSidebar();

  const navItems = [
    {
      href: '#',
      icon: <Menu className="w-8 h-8" />,
      title: 'Menu',
      description: 'Dépliez ou repliez le menu latéral.',
      onClick: toggleSidebar,
    },
    ...(canSeeAdmin ? [{
      href: '/dashboard/administration',
      icon: <Shield className="w-8 h-8" />,
      title: 'Administration',
      description: 'Gérez les utilisateurs et le contenu.'
    }] : []),
    {
      href: '/dashboard/all-events',
      icon: <Calendar className="w-8 h-8" />,
      title: 'Toutes les sorties',
      description: 'Parcourez tous les événements.'
    },
    {
      href: '/dashboard/my-events',
      icon: <CalendarCheck className="w-8 h-8" />,
      title: 'Mes sorties',
      description: 'Gérez vos événements et inscriptions.'
    },
    {
      href: '/dashboard/profile',
      icon: <User className="w-8 h-8" />,
      title: 'Mon Profil',
      description: 'Mettez à jour vos informations.'
    },
    {
      href: '/dashboard/messages',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Messages',
      description: 'Discutez avec les autres membres.'
    },
    {
      href: '/dashboard/facebook-groups',
      icon: <Facebook className="w-8 h-8" />,
      title: 'Groupes Facebook',
      description: 'Trouvez plus de sorties sur Facebook.'
    },
    {
      href: 'https://www.meetup.com/fr-FR/expats-in-toulouse/events/',
      icon: <ExternalLink className="w-8 h-8" />,
      title: 'Événements Meetup',
      description: 'Découvrez les événements du groupe "Expats in Toulouse".',
      isExternal: true,
    },
    {
      href: '/dashboard/help',
      icon: <LifeBuoy className="w-8 h-8" />,
      title: 'Aide',
      description: 'Consultez la FAQ et l\'aide.'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <ImageMosaic />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8" />
            Tableau de bord
          </h1>
          {isMobile && (
            <Button onClick={toggleSidebar} variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Ouvrir le menu</span>
            </Button>
          )}
        </div>
        <p className="text-muted-foreground mt-2">
          Bienvenue ! Voici un aperçu rapide et des raccourcis vers les sections principales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navItems.map((item) => {
          const content = (
            <Card className="flex flex-col border-primary/10 hover:shadow-md transition-shadow h-full">
              <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {item.icon}
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-primary/90">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-4 pt-0 flex-grow">
                <p className="text-muted-foreground flex-grow">{item.description}</p>
                <Button asChild variant="outline" className="w-full mt-auto">
                  <span>
                    Accéder
                    <ArrowRight className="ml-2 h-4 w-4 inline" />
                  </span>
                </Button>
              </CardFooter>
            </Card>
          );

          if (item.onClick) {
            return (
              <div key={item.title} className="h-full cursor-pointer" onClick={item.onClick}>
                {content}
              </div>
            )
          }

          if ((item as any).isExternal) {
            return (
              <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="h-full">
                {content}
              </a>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="h-full">
              {content}
            </Link>
          )
        })}
      </div>
    </div>
  );
}
