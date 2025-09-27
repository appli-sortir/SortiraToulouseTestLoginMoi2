import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('relative h-24 w-24', className)}>
        <Image
            src="https://firebasestorage.googleapis.com/v0/b/tolosaamicalstudio.firebasestorage.app/o/sortiratoulouse%2FsortirToulouseLogo.jpg?alt=media&token=26b5c466-7964-4f58-ae62-ba2c9eee5566"
            alt="Sortir à Toulouse logo"
            fill
            className="rounded-full object-cover"
            sizes="96px"
        />
    </div>
  );
}
