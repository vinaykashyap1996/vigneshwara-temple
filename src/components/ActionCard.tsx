import { ReactNode } from "react";

type Props = {
  icon: string;
  title: string;
  description: string;
};

export default function ActionCard({ icon, title, description }: Props) {
  return (
    <div
      className="
        w-60
        group relative overflow-hidden
        rounded-xl
        border border-brand-200/40
        bg-ivory
        p-6
        shadow-sm
        transition-all
        hover:-translate-y-0.1 hover:shadow-lg
      "
    >
      {/* Icon */}
      <div
        className="
          mb-4 flex h-12 w-12 items-center justify-center
          rounded-3xl
          bg-gold-500
          text-gold-700
        "
      >
        {icon}
      </div>

      {/* Title */}
      <h4 className="h4 mb-4 text-red-700">{title}</h4>

      {/* Description */}
      <p className="text-desc text-red">{description}</p>

      {/* Subtle inner highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20" />
    </div>
  );
}
