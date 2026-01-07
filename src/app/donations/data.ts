import { CauseOption } from './types';

export const causeOptions: CauseOption[] = [
  {
    id: 'maintenance',
    title: 'causes.maintenance',
    description: 'causes.maintenanceDesc',
    icon: 'temple_hindu',
    iconColor: 'text-orange-500',
    iconBgColor: 'bg-orange-500/20',
  },
  {
    id: 'food',
    title: 'causes.annadanam',
    description: 'causes.annadanamDesc',
    icon: 'restaurant',
    iconColor: 'text-orange-500',
    iconBgColor: 'bg-orange-500/20',
  },
  {
    id: 'renovation',
    title: 'causes.festivals',
    description: 'causes.festivalsDesc',
    icon: 'handyman',
    iconColor: 'text-orange-700',
    iconBgColor: 'bg-orange-700/20',
  },
  {
    id: 'custom',
    title: 'causes.custom',
    description: 'causes.customDesc',
    icon: 'edit_note',
    iconColor: 'text-orange-600',
    iconBgColor: 'bg-orange-600/20',
  },
];

export const presetAmounts = [101, 501, 1001, 5001];
