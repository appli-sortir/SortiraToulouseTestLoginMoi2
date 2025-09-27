import { HomePageClient } from '@/components/home-page-client';
import { events, categories } from '@/lib/events';

export default function Home() {
  return (
    <>
      <HomePageClient allEvents={events} categories={categories} />
    </>
  );
}
