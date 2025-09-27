
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const images = [
    'http://bilingue31.free.fr/Accueil_afterwork_OK.jpg',
    'http://bilingue31.free.fr/Accueil_bibliotheque_OK.jpg',
    'http://bilingue31.free.fr/Accueil_cafelangues1_OK.jpg',
    'http://bilingue31.free.fr/Accueil_concert_OK.jpg',
    'http://bilingue31.free.fr/Accueil_crochet_OK.jpg',
    'http://bilingue31.free.fr/Accueil_cuisine_OK.jpg',
    'http://bilingue31.free.fr/Accueil_danse_OK.jpg',
    'http://bilingue31.free.fr/Accueil_etudiants_OK.jpg',
    'http://bilingue31.free.fr/Accueil_jeux1_OK.jpg',
    'http://bilingue31.free.fr/Accueil_lecture3_OK.jpg',
    'http://bilingue31.free.fr/Accueil_livres_OK.jpg',
    'http://bilingue31.free.fr/Accueil_musee2_OK.jpg',
    'http://bilingue31.free.fr/Accueil_piquenique2_OK.jpg',
    'http://bilingue31.free.fr/Accueil_rando_OK.jpg',
    'http://bilingue31.free.fr/Accueil_restaurant_OK.jpg',
    'http://bilingue31.free.fr/Accueil_salondethe_OK.jpg',
    'http://bilingue31.free.fr/Accueil_salondethe2_OK.jpg',
    'http://bilingue31.free.fr/Accueil_theatre_OK.jpg',
    'http://bilingue31.free.fr/Accueil_visite_OK.jpg',
    'http://bilingue31.free.fr/Accueil_yoga_OK.jpg'
];

export function ImageMosaic() {
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle the array and take the first few to make the mosaic dynamic on each load.
    setShuffledImages(images.sort(() => 0.5 - Math.random()).slice(0, 7));
  }, []);

  if (shuffledImages.length === 0) {
    // Render a placeholder or null on the server and initial client render
    // to prevent hydration mismatch.
    return (
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-lg overflow-hidden animate-pulse">
            <div className="col-span-2 row-span-2 bg-muted rounded-md"></div>
            <div className="col-span-1 row-span-1 bg-muted rounded-md"></div>
            <div className="col-span-1 row-span-1 bg-muted rounded-md"></div>
            <div className="col-span-1 row-span-1 bg-muted rounded-md"></div>
            <div className="col-span-1 row-span-1 bg-muted rounded-md"></div>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-lg overflow-hidden">
      {shuffledImages.map((src, index) => {
        const isFirstImage = index === 0;
        return (
          <div key={src} className={cn(
            'relative',
            isFirstImage ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
          )}>
            <Image
              src={src}
              alt={`Image de présentation ${index + 1}`}
              fill
              priority={isFirstImage}
              className="object-cover"
              sizes={isFirstImage ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              data-ai-hint="community event"
            />
          </div>
        );
      })}
    </div>
  );
}
