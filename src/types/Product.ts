export interface Variation {
  id: string;
  name?: string;
  price?: number | string;
  currency?: string;
  color?: string | null;
  size?: string | null;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  price: string | number;
  description?: string;
  image?: string;
  variations?: Variation[];
  category?: string | null;
} 