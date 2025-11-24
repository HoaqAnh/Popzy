import { type PhotoItem } from "@/types/listing";

export const mockInitialPhotos: PhotoItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1600596542815-2a4d04774c13?w=400&auto=format&fit=crop&q=60",
    status: "success",
    isCover: true,
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=60",
    status: "success",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400&auto=format&fit=crop&q=60",
    status: "uploading",
  },
  {
    id: "4",
    url: "",
    status: "error",
  },
];

export const directions = [
  "Đông",
  "Tây",
  "Nam",
  "Bắc",
  "Đông Nam",
  "Đông Bắc",
  "Tây Nam",
  "Tây Bắc",
];

export const legalStatuses = [
  "Sổ đỏ / Sổ hồng",
  "Hợp đồng mua bán",
  "Đang chờ sổ",
  "Giấy tờ khác",
];

export const furnitureStatus = [
  "Nội thất cao cấp",
  "Nội thất đầy đủ",
  "Nội thất cơ bản",
  "Không có nội thất",
];
