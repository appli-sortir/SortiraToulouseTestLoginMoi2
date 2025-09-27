import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function CharterPage() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl font-headline text-primary">
              <Shield className="w-8 h-8" />
              Charte d'utilisation de Tolosa
            </CardTitle>
            <CardDescription>Règles de bonne conduite et conditions d'utilisation de notre service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
            <p>
              Bienvenue sur Tolosa ! Pour que notre communauté reste un espace convivial, sûr et respectueux, nous vous demandons de lire et d'accepter les règles suivantes.
            </p>
            <ol className="space-y-4 list-decimal list-inside">
              <li>
                <h3 className="font-semibold inline text-primary/90">Respect et bienveillance</h3>
                <p className="pl-4">Chaque membre s'engage à faire preuve de courtoisie, de respect et de tolérance envers les autres utilisateurs. Les propos haineux, discriminatoires, injurieux, ou toute forme de harcèlement sont strictement interdits et entraîneront une suspension immédiate du compte.</p>
              </li>
              <li>
                <h3 className="font-semibold inline text-primary/90">Sécurité et données personnelles</h3>
                <p className="pl-4">Ne partagez jamais d'informations personnelles sensibles (numéro de téléphone, adresse exacte, informations bancaires) dans les espaces publics de l'application. Utilisez la messagerie privée pour des échanges plus personnels, mais restez vigilant.</p>
              </li>
              <li>
                <h3 className="font-semibold inline text-primary/90">Contenu des publications</h3>
                <p className="pl-4">Toute publication (annonces, discussions, événements) doit être légale et conforme aux bonnes mœurs. Les contenus à caractère pornographique, violent, illégal ou faisant l'apologie d'activités illicites sont proscrits.</p>
              </li>
              <li>
                <h3 className="font-semibold inline text-primary/90">Interdiction des sorties de rencontre amoureuse ou entre célibataires</h3>
                <p className="pl-4">Etant donné les problèmes provoqués par les évènements de rencontre, les sorties de rencontre sont prohibées sur notre application. Tolosa est une plateforme dédiée aux sorties amicales et à l'entraide. Les événements organisés dans le but explicite de faire des rencontres amoureuses ou "dating" ne sont pas autorisés. Toute publication de ce type sera supprimée. Tout contrevenant pourra faire l'objet d'une suspension de son compte.</p>
              </li>
              <li>
                <h3 className="font-semibold inline text-primary/90">Signalements</h3>
                <p className="pl-4">Si vous constatez un comportement ou un contenu qui enfreint cette charte, utilisez les outils de signalement mis à votre disposition. Notre équipe de modération examinera chaque signalement avec attention.</p>
              </li>
              <li>
                <h3 className="font-semibold inline text-primary/90">Responsabilité</h3>
                <p className="pl-4">Les organisateurs de sorties sont responsables du bon déroulement de leurs événements. Tolosa agit comme une plateforme de mise en relation et ne peut être tenu responsable des incidents survenant lors des activités organisées par ses membres.</p>
              </li>
              <li>
                <h3 className="font-semibold inline text-primary/90">Sorties payantes</h3>
                <p className="pl-4">En ce qui concerne les sorties payantes ou qui contiennent des activités payantes ou vente de produits à côté, elles doivent être signalées au moins dans la description de la sortie. La transparence est essentielle pour que les membres puissent participer en toute connaissance de cause.</p>
              </li>
              <li>
                <h3 className="font-semibold inline text-primary/90">Concurrence</h3>
                <p className="pl-4">L'utilisation de cette application ne doit pas donner lieu à la promotion d'une autre application de même type que celle-ci.</p>
              </li>
            </ol>
             <p className="pt-4 font-semibold">
              En vous inscrivant, vous confirmez avoir lu et accepté l'ensemble de cette charte. Merci de contribuer à faire de Tolosa un espace positif et accueillant pour tous !
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
