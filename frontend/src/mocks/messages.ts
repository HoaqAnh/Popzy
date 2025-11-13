export const conversations = [
  {
    id: "c1",
    userId: "u2",
    name: "Tạ Minh Đức",
    lastMessage: "Chiều mai 3h được không?",
    timestamp: "10:32 AM",
  },
  {
    id: "c2",
    userId: "u3",
    name: "Thanh Hà",
    lastMessage: "Bạn ơi, Biệt thự 3 tầng phong cách...",
    timestamp: "09:15 AM",
  },
  {
    id: "c3",
    userId: "u4",
    name: "Nam Anh",
    lastMessage: "Nội thất cao cấp, tiện ích 5 sao...",
    timestamp: "Hôm qua",
  },
];

export const messages = {
  c1: [
    {
      id: "m1",
      senderId: "u2",
      text: "Chào bạn, tôi quan tâm đến căn Vinhomes Ocean Park.",
      timestamp: "10:30 AM",
    },
    {
      id: "m2",
      senderId: "me",
      text: "Chào anh Đức, căn đó vẫn còn ạ. Anh muốn xem nhà khi nào?",
      timestamp: "10:31 AM",
    },
    {
      id: "m3",
      senderId: "u2",
      text: "Chiều mai 3h được không?",
      timestamp: "10:32 AM",
    },
  ],
  c2: [
    {
      id: "m4",
      senderId: "u3",
      text: "Bạn ơi, Biệt thự 3 tầng phong cách hiện đại, view hồ, bể bơi nước mặn, gara 2 chỗ còn không?",
      timestamp: "09:15 AM",
    },
  ],
  c3: [
    {
      id: "m5",
      senderId: "u4",
      text: "Nội thất cao cấp, tiện ích 5 sao, bể bơi vô cực, gần trường quốc tế. Cần bán gấp.",
      timestamp: "Hôm qua",
    },
  ],
};
