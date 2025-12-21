import pandas as pd
from market_fetch import get_market_samples

# ==========================
#  DANH SÁCH QUẬN
# ==========================
districts = [
    "quan_1",
    "quan_3",
    "quan_binh_thanh",
    "quan_tan_binh",
    "quan_go_vap",
    "quan_7",
]

all_samples = []

# ==========================
#  BẮT ĐẦU CRAWL
# ==========================
for d in districts:
    print(f"Đang thu thập dữ liệu {d} ...")
    samples = get_market_samples(d)

    print(f"→ Thu được {len(samples)} mẫu")

    if samples:
        print("  Ví dụ:", samples[:1])

    # thêm district_key vào từng row
    for s in samples:
        s["district_key"] = d

    all_samples.extend(samples)
    print("-" * 40)


# ==========================
#  LƯU CSV
# ==========================
if not all_samples:
    print("Không có dữ liệu nào để lưu.")
else:
    df = pd.DataFrame(all_samples)

    # Nếu API trả về list_id thì dùng để xóa trùng
    if "list_id" in df.columns:
        df = df.drop_duplicates(subset=["list_id"])
    else:
        # fallback cũ
        df = df.drop_duplicates(subset=["title", "price", "area", "district_key"])

    df.to_csv("market_data.csv", index=False, encoding="utf-8-sig")
    print(f" Đã lưu {len(df)} mẫu vào market_data.csv")
