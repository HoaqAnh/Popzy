# model_loader.py
import joblib
import xgboost as xgb
from tensorflow import keras

def load_all_models(
    preprocess_path: str = "preprocess.pkl",
    dnn_path: str = "dnn_full.keras",
    xgb_path: str = "xgb_full.json",
    meta_path: str = "meta_ridge.pkl",
):
    # 1) Tiền xử lý (ColumnTransformer đã fit)
    preprocess = joblib.load(preprocess_path)

    # 2) DNN (Keras SavedModel)
    dnn = keras.models.load_model(dnn_path)

    # 3) XGBoost (định dạng native .json)
    xgb_model = xgb.XGBRegressor()
    xgb_model.load_model(xgb_path)

    # 4) Meta Ridge (cho stacking)
    meta = joblib.load(meta_path)

    return preprocess, dnn, xgb_model, meta
