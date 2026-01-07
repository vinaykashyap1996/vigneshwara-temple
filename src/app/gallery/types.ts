export type GalleryCategory =
  | 'all'
  | 'festivals'
  | 'rituals'
  | 'community'
  | 'alankaram'
  | 'architecture';

export interface GalleryItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: GalleryCategory;
  imageUrl: string;
  date?: string;
  featured?: boolean;
  size?: 'small' | 'medium' | 'large' | 'wide';
}

export interface GalleryFilter {
  id: GalleryCategory;
  label: string;
}
