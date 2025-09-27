
'use client';
import Image from 'next/image';
import { Card } from './ui/card';

interface MapViewProps {
  location: {
    lat: number;
    lng: number;
  };
}

export function MapView({ location }: MapViewProps) {
  return (
    <Card className="overflow-hidden border-primary/20">
      <div className="relative h-48 w-full bg-muted">
        <Image
          src={`https://picsum.photos/seed/${location.lat}/600/400`}
          alt="Map of Toulouse showing event location"
          fill
          className="object-cover opacity-30"
          data-ai-hint="map Toulouse"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4 bg-background/80 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg text-primary">Map View</h3>
            <p className="text-muted-foreground text-sm">Interactive map coming soon!</p>
            <p className="text-xs text-muted-foreground mt-2">
              Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
