export type PhotoItem = {
  id: string;
  url: string;
  publicId?: string;
  status: "success" | "uploading" | "error";
  file?: File;
  isCover?: boolean;
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
