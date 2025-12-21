import requests

HEADERS = {
    "User-Agent": "Mozilla/5.0"
}

# mapping quận → area_name trên Chợ Tốt
DISTRICT_MAP = {
    "quan_1": "Quận 1",
    "quan_3": "Quận 3",
    "quan_binh_thanh": "Bình Thạnh",
    "quan_tan_binh": "Tân Bình",
    "quan_go_vap": "Gò Vấp",
    "quan_7": "Quận 7"
}

def crawl_chotot_by_district(district_name, pages=10):
    results = []
    target = DISTRICT_MAP[district_name].lower()

    for page in range(1, pages + 1):
        url = f"https://gateway.chotot.com/v1/public/ad-listing?region_v2=13000&cg=1000&limit=20&page={page}"

        try:
            res = requests.get(url, headers=HEADERS, timeout=10).json()
        except:
            continue

        if "ads" not in res:
            continue

        for item in res["ads"]:
            area_name = (item.get("area_name") or "").lower()

            # kiểm tra chứa tên
            if target not in area_name:
                continue

            results.append({
    "list_id": item.get("list_id"),
    "title": item.get("subject"),
    "price": item.get("price"),
    "price_million": item.get("price") / 1_000_000 if item.get("price") else None,
    "area": item.get("size"),
    "district": item.get("area_name"),
    "ward": item.get("ward_name"),
    "street": item.get("street_name"),
    "lat": item.get("latitude"),
    "lon": item.get("longitude"),
    "image": item.get("image"),
    "images": item.get("images", []),
    "url": f"https://www.chotot.com/{item.get('list_id')}.htm"
})


    return results



def get_market_samples(district_key):
    """
    Hàm gọi từ API Flask → trả về giá thị trường theo quận
    """
    if district_key not in DISTRICT_MAP:
        return []

    samples = crawl_chotot_by_district(district_key)
    return samples
