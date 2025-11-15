import type { Post } from "@/types/realestate";

export const myPosts: Post[] = [
  {
    id: "p1",
    title: "Booking F3 Sun Feliza Suites Cầu Giấy - CK 20.5%",
    price: 2_950_000_000,
    areaM2: 95,
    beds: 3,
    baths: 2,
    address: { district: "Cầu Giấy", city: "Hà Nội" },
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Sau thành công của các tòa trước, Sun Property ra mắt tòa F3 với 392 sản phẩm cao cấp, tiện ích chuẩn quốc tế.",
    userId: "u1",
    likes: 1250,
    marketPrice: 2_850_000_000,
    priceHistoryPercent: 3.5,
  },
  {
    id: "p5",
    title: "Nhà riêng 5 tầng Kim Liên, Đống Đa, ngõ thông",
    price: 6_800_000_000,
    areaM2: 40,
    beds: 4,
    baths: 3,
    address: { district: "Đống Đa", city: "Hà Nội" },
    images: [
      "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Nhà xây chắc chắn, thiết kế hiện đại, ngõ ba gác, gần chợ, trường học các cấp.",
    userId: "u1",
    likes: 520,
    marketPrice: 7_000_000_000,
    priceHistoryPercent: -2.9,
  },
  {
    id: "p9",
    title: "Biệt thự song lập Ecopark, Sân Golf, 300m²",
    price: 42_000_000_000,
    areaM2: 300,
    beds: 5,
    baths: 5,
    address: { district: "Văn Giang", city: "Hưng Yên" },
    images: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Khu biệt thự đảo, 4 mặt thoáng, view sân golf. Hoàn thiện mặt ngoài.",
    userId: "u1",
    likes: 99,
    marketPrice: 41_500_000_000,
    priceHistoryPercent: 1.2,
  },
];
