import { CauseOption } from './types';

export const causeOptions: CauseOption[] = [
  {
    id: 'maintenance',
    title: 'donations.causes.maintenance',
    description: 'Support daily rituals, flowers, priests, and upkeep of the premises.',
    icon: 'temple_hindu',
    iconColor: 'text-orange-500',
    iconBgColor: 'bg-orange-500/20',
  },
  {
    id: 'food',
    title: 'donations.causes.annadanam',
    description: 'Help us feed hundreds of devotees daily with nutritious prasadam.',
    icon: 'restaurant',
    iconColor: 'text-orange-500',
    iconBgColor: 'bg-orange-500/20',
  },
  {
    id: 'renovation',
    title: 'donations.causes.festivals',
    description: 'Contribute to the ongoing expansion and structural repairs of the sanctum.',
    icon: 'handyman',
    iconColor: 'text-orange-700',
    iconBgColor: 'bg-orange-700/20',
  },
  {
    id: 'custom',
    title: 'donations.causes.custom',
    description: 'Specify your own purpose for donation - educational programs, special events, or other temple activities.',
    icon: 'edit_note',
    iconColor: 'text-orange-600',
    iconBgColor: 'bg-orange-600/20',
  },
];

export const presetAmounts = [101, 501, 1001, 5001];
