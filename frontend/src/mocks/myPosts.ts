import type { Post } from "@/types/realestate";

export const myPosts: Post[] = [
  {
    id: "p4",
    title: "Bán gấp chung cư mini Cầu Giấy, 50m², 2PN, full nội thất",
    price: 1_800_000_000,
    areaM2: 50,
    beds: 2,
    baths: 1,
    address: { district: "Cầu Giấy", city: "Hà Nội" },
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Chung cư full nội thất, gần trường học, an ninh tốt. Có sổ đỏ.",
    userId: "u1",
    likes: 45,
  },
  {
    id: "p5",
    title: "Nhà mặt phố Hoàng Mai, 5 tầng, kinh doanh sầm uất",
    price: 12_500_000_000,
    areaM2: 80,
    beds: 4,
    baths: 3,
    address: { district: "Hoàng Mai", city: "Hà Nội" },
    images: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=800&auto=format&fit=crop",
    ],
    description:
      "Vị trí đắc địa, vỉa hè rộng, 5 tầng, đang cho thuê 50tr/tháng.",
    userId: "u1",
    likes: 102,
  },
];
