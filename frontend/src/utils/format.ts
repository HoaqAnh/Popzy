export function formatPrice(p: number): string {
  if (p >= 1_000_000_000) {
    return (p / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + " tỷ";
  }
  if (p >= 1_000_000) {
    return (p / 1_000_000).toFixed(0) + " triệu";
  }
  return p.toLocaleString("vi-VN") + " đ";
}
