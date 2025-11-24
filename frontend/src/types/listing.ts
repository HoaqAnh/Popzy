export type PhotoItem = {
  id: string;
  url: string;
  status: "success" | "uploading" | "error";
  isCover?: boolean;
  file?: File;
};

export type CreateListingFormValues = {
  images: PhotoItem[];
  title: string;
  description: string;
  district: string;
  city: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  frontage?: number;
  accessRoad?: number;
  floors?: number;
  houseDirection?: string;
  balconyDirection?: string;
  legalStatus?: string;
  furniture?: string;
};
