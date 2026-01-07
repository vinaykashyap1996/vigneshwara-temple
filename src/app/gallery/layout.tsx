import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - Sacred Moments | Shri Vighneshwara Swamy Temple',
  description:
    'A curated collection of divine darshans, festive grandeur, and the silent daily rituals that breathe life into Shri Vighneshwara Swamy Temple.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
