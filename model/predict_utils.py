# predict_utils.py
import numpy as np
import pandas as pd

# Map JSON keys -> column names khi train
# (sửa lại cho khớp đúng tên bạn đã dùng trong preprocess_fitted)
JSON_TO_TRAIN_COLS = {
    "Area": "Area",
    "Frontage": "Frontage",
    "Access_Road": "Access Road",
    "Floors": "Floors",
    "Bedrooms": "Bedrooms",
    "Bathroom": "Bathrooms",               
    "House_direction": "House direction",
    "Balcony_direction": "Balcony direction",
    "Legal_status": "Legal status",
    "Furniture": "Furniture state",        
    "District": "District",
    "City": "City",
}

def normalize_columns(df: pd.DataFrame) -> pd.DataFrame:
    """Đổi tên cột từ JSON sang tên cột training để preprocess.transform hoạt động."""
    rename_map = {k: v for k, v in JSON_TO_TRAIN_COLS.items() if k in df.columns}
    df2 = df.rename(columns=rename_map).copy()
    return df2

def predict_pipeline(df_raw: pd.DataFrame, preprocess, dnn, xgb_model, meta, mode="stack", w: float = 0.3):
    # 1) Chuẩn hoá tên cột khớp training
    df = normalize_columns(df_raw)

    # 2) Tiền xử lý (ColumnTransformer)
    X_proc = preprocess.transform(df)

    # 3) Dự đoán base models
    p_dnn = dnn.predict(X_proc, verbose=0).ravel()
    p_xgb = xgb_model.predict(X_proc).ravel()

    # 4) Chế độ xuất
    if mode == "xgb":
        return p_xgb
    if mode == "dnn":
        return p_dnn
    if mode == "weighted":
        return w * p_dnn + (1.0 - w) * p_xgb

    # 5) Stack (meta Ridge)
    Z = np.vstack([p_dnn, p_xgb]).T
    return meta.predict(Z).ravel()
