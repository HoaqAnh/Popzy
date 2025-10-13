import type { Post } from "@/types/realestate";

export const posts: Post[] = [
  {
    id: "p1",
    title: "Booking F3 Sun Feliza Suites Cầu Giấy - CK 20.5%",
    price: 2_950_000_000,
    areaM2: 95,
    beds: 3,
    baths: 2,
    address: { district: "Cầu Giấy", city: "Hà Nội" },
    images: [
      "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d92?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Sau thành công của các tòa trước, Sun Property ra mắt tòa F3 với 392 sản phẩm cao cấp, tiện ích chuẩn quốc tế.",
    userId: "u1",
    likes: 1250,
  },
  {
    id: "p2",
    title: "Vinhomes Ocean Park Gia Lâm - Studio/1-3PN chính chủ",
    price: 2_750_000_000,
    areaM2: 43,
    beds: 1,
    baths: 1,
    address: { district: "Gia Lâm", city: "Hà Nội" },
    images: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Căn hộ studio 28-36m², giá chỉ từ 2 tỷ, nội thất cao cấp, miễn phí trung gian.",
    userId: "u2",
    likes: 980,
  },
  {
    id: "p3",
    title: "Biệt thự ven Hồ Tây đẳng cấp, sân vườn rộng",
    price: 35_000_000_000,
    areaM2: 350,
    beds: 5,
    baths: 5,
    address: { district: "Tây Hồ", city: "Hà Nội" },
    images: [
      "https://images.unsplash.com/photo-1560185127-1a109031dc87?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Biệt thự 3 tầng phong cách hiện đại, view hồ, bể bơi nước mặn, gara 2 chỗ.",
    userId: "u3",
    likes: 432,
  },
];