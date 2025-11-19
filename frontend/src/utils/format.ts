export function formatPrice(p: number): string {
  if (p >= 1_000_000_000) {
    return (p / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + " tỷ";
  }
  if (p >= 1_000_000) {
    return (p / 1_000_000).toFixed(0) + " triệu";
  }
  return p.toLocaleString("vi-VN") + " đ";
}

export function getAvatarLabel(name: string): string {
  if (!name) return "U";
  return name.charAt(0).toUpperCase();
}

export function timeSince(date: string): string {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " năm trước";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " tháng trước";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " ngày trước";
  return "Vừa đăng";
}
