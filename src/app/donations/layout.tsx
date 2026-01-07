import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donations - Support Our Temple | Shri Vighneshwara Swamy Temple',
  description:
    'Your generous donations help us sustain the sanctity of the temple, perform daily rituals, and serve the community through Anna Dana. Support temple maintenance, food distribution, or renovation projects.',
};

export default function DonationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
