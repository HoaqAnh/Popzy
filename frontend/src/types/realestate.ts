export type User = {
  id: string;
  fullname: string;
  age?: number;
  phone?: string;
  email?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
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

export type Step1FormValues = {
  email: string;
  phone: string;
};

export type Step2FormValues = {
  fullname: string;
  password: string;
};
