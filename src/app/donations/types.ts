export type DonationCause = 'maintenance' | 'food' | 'renovation' | 'custom';

export interface CauseOption {
  id: DonationCause;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  iconBgColor: string;
}

export interface DonorInfo {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  wantsTaxReceipt: boolean;
}

export interface DonationState {
  cause: DonationCause;
  customCauseText?: string;
  amount: number;
  donorInfo: Partial<DonorInfo>;
}
