export const cities = [
  { code: "hanoi", name: "Hà Nội" },
  { code: "hochiminh", name: "TP. Hồ Chí Minh" },
  { code: "danang", name: "Đà Nẵng" },
];

export const districts: Record<string, { code: string; name: string }[]> = {
  hanoi: [
    { code: "badinh", name: "Ba Đình" },
    { code: "hoankiem", name: "Hoàn Kiếm" },
    { code: "tayho", name: "Tây Hồ" },
    { code: "caugiay", name: "Cầu Giấy" },
    { code: "dongda", name: "Đống Đa" },
    { code: "namtuliem", name: "Nam Từ Liêm" },
  ],
  hochiminh: [
    { code: "q1", name: "Quận 1" },
    { code: "q3", name: "Quận 3" },
    { code: "binhthanh", name: "Bình Thạnh" },
    { code: "tanbinh", name: "Tân Bình" },
    { code: "tpthuduc", name: "TP. Thủ Đức" },
    { code: "q7", name: "Quận 7" },
  ],
  danang: [
    { code: "haichau", name: "Hải Châu" },
    { code: "sontra", name: "Sơn Trà" },
    { code: "nguhanhson", name: "Ngũ Hành Sơn" },
    { code: "camle", name: "Cẩm Lệ" },
  ],
};
