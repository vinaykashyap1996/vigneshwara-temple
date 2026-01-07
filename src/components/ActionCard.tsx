import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

export default function ActionCard({
  icon: Icon,
  title,
  description,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className='
        w-60
        group relative overflow-hidden
        rounded-xl
        border border-brand-200/40
        bg-ivory
        p-6
        shadow-sm
        transition-all
        hover:-translate-y-1 hover:shadow-xl
        cursor-pointer
        block
      '>
      {/* Icon */}
      <div
        className='
          mb-4 flex h-12 w-12 items-center justify-center
          rounded-full
          bg-gold-500
          text-gold-700
          transition-transform
          group-hover:scale-110
        '>
        <Icon className='h-6 w-6' aria-hidden='true' />
      </div>

      {/* Title */}
      <h4 className='h4 mb-2 text-red-700'>{title}</h4>

      {/* Description */}
      <p className='text-sm text-gray-600'>{description}</p>

      {/* Subtle inner highlight */}
      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20' />
    </Link>
  );
}
