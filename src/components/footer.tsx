import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-4 px-4 sm:px-6 lg:px-8 bg-background border-t">
      <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
        <span>© 2025 Sortir à Toulouse. Tous droits réservés.</span>
        <span className="text-primary hidden sm:inline">|</span>
        <Link href="/about" className="hover:underline text-primary">
          À propos
        </Link>
        <span className="text-primary">|</span>
        <Link href="/legal" className="hover:underline text-primary">
          Mentions légales
        </Link>
        <span className="text-primary">|</span>
        <Link href="/charter" className="hover:underline text-primary">
          Charte d'utilisation
        </Link>
        <span className="text-primary">|</span>
        <Link href="/contact" className="hover:underline text-primary">
          Contact
        </Link>
      </div>
    </footer>
  );
}
