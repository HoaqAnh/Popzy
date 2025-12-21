export type User = {
  id: number;
  fullname: string;
  email: string;
  age?: number;
  phone?: string;
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
  id: number;
  title: string;
  price: number;
  areaM2: number;
  beds: number;
  baths: number;
  address: Address;
  images: string[];
  description: string;
  userId: number;
  likes: number;
  marketPrice?: number;
  priceHistoryPercent?: number;
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
