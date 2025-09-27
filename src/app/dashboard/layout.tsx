"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import {
  Calendar,
  User,
  Users,
  MessageSquare,
  CalendarCheck,
  LayoutDashboard,
  Shield,
  ExternalLink,
  Facebook,
  LogOut,
  LifeBuoy,
  School,
  Heart,
  Megaphone,
  Repeat,
  StickyNote,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/logo';
import { getCurrentUser, logout } from '@/lib/auth';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userRole = user.role || 'Membre';
  const isFemale = user.genre === 'Femme';
  const isStudent = user.etudiant;

  const canSeeAdmin = userRole === 'Administrateur' || userRole === 'Modérateur';
  const canSeeGirlsOutings = canSeeAdmin || isFemale;
  const canSeeStudentOutings = canSeeAdmin || isStudent;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-1">
          <Sidebar collapsible="icon">
            <SidebarHeader className="p-4">
              <div className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <Logo className="h-10 w-10" />
                  <h1 className="text-xl font-semibold text-primary">Sortir à Toulouse</h1>
                </Link>
                <SidebarTrigger />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard">
                      <LayoutDashboard />
                      <span>Tableau de bord</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {canSeeAdmin && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/administration">
                        <Shield />
                        <span>Administration</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/profile">
                      <User />
                      <span>Mon Profil</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/messages">
                      <MessageSquare />
                      <span>Messages</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/members">
                      <Users />
                      <span>Membres</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/all-events">
                      <Calendar />
                      <span>Toutes les sorties</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/my-events">
                      <CalendarCheck />
                      <span>Mes sorties</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {canSeeGirlsOutings && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/girls-outings">
                        <Heart />
                        <span>Sorties entre filles</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                {canSeeStudentOutings && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/dashboard/student-outings">
                        <School />
                        <span>Sorties étudiantes</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/exchange-in-toulouse">
                      <Repeat />
                      <span>Échanges sur Toulouse</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/notes-toulouse">
                      <StickyNote />
                      <span>Notes sur Toulouse</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/suggested-events">
                      <Megaphone />
                      <span>Événements suggérés</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/facebook-groups">
                      <Facebook />
                      <span>Groupes Facebook</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a
                      href="https://www.meetup.com/fr-FR/expats-in-toulouse/events/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink />
                      <span>Événements Meetup</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/dashboard/help">
                      <LifeBuoy />
                      <span>Aide</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>

              <div className="mt-auto">
                <Separator className="my-2" />
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => {
                        logout();
                        router.push("/login");
                      }}
                    >
                      <LogOut />
                      <span>Déconnexion</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </SidebarContent>

            <SidebarFooter>
              <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                <Avatar>
                  <AvatarFallback>{user.identifiant[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{user.identifiant}</span>
                  <span className="text-xs text-muted-foreground">{userRole}</span>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <main className="p-4 sm:p-6 lg:p-8 w-full flex-grow">{children}</main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
