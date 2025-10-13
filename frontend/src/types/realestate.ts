export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export type Address = {
  district: string;
  city: string;
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
};