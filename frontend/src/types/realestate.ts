export type User = {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
};

export type Address = {
  district: string;
  city: string;
  street?: string;
};

export type Post = {
  id: string;
  title: string;
  price: number;
  areaM2: number;
  beds: number;
  baths: number;
  address: Address;
  images: string[];
  description: string;
  userId: string;
  likes: number;
  marketPrice: number;
  priceHistoryPercent: number;
  floors?: number;
  frontage?: number;
  access_road?: number;
  house_direction?: string;
  balcony_direction?: string;
  legal_status?: string;
  furniture?: string;
  created_at?: string;
  views?: number;
};