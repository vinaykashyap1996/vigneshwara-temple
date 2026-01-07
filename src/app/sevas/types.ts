export type SevaCategory = 'daily' | 'weekly' | 'monthly' | 'festival' | 'special';
export type SevaFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'on-request';
export type SevaTiming = 'morning' | 'evening' | 'full-day';

export interface Seva {
    id: string;
    slug: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    benefits: string[];
    requirements: string[];
    duration: string;
    timing: SevaTiming[];
    suggestedDonation: {
        min: number;
        recommended: number;
    };
    category: SevaCategory;
    frequency: SevaFrequency;
    tags: string[];
    featured: boolean;
}
