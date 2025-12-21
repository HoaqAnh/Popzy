# app.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from fastapi import Depends
from sqlalchemy import create_engine, Column, Integer, String, Float, BigInteger, DateTime, Text, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from model_loader import load_all_models
from predict_utils import predict_pipeline

# 👇 import cho model ảnh
from image_classifier import load_image_model, predict_image_bytes

app = FastAPI(title="Real Estate Price + Image Moderation API")

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== Load mô hình giá 1 lần khi server khởi động ==========
preprocess, dnn, xgb_model, meta = load_all_models()

# ========== Load mô hình ảnh 1 lần khi server khởi động ==========
image_model, image_class_names, image_transform = load_image_model()
DATABASE_URL = "mysql+pymysql://root:admin123@localhost:3306/Bds"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# ================== MODELS ==================
class Post(Base):
    __tablename__ = "post"

    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(100))
    description = Column(Text)
    price = Column(Float)
    user_id = Column(BigInteger)
    create_at = Column(DateTime)
    update_at = Column(DateTime)
class Properties(Base):
    __tablename__ = "properties"

    id = Column(BigInteger, primary_key=True, index=True)
    access_road = Column(Integer)
    area = Column(Integer)
    balcony_direction = Column(String(30))
    bathroom = Column(Integer)
    bedrooms = Column(Integer)
    city = Column(String(30))
    district = Column(String(30))
    floors = Column(Integer)
    frontage = Column(Integer)
    furniture = Column(String(30))
    house_direction = Column(String(30))
    legal_status = Column(String(30))
    post_id = Column(BigInteger, ForeignKey("post.id"))
# --------- Schema input cho giá nhà ---------
class HouseData(BaseModel):
    Area: float
    Frontage: float
    Access_Road: float
    Floors: float
    Bedrooms: int
    Bathroom: int
    House_direction: str
    Balcony_direction: str
    Legal_status: str
    Furniture: str
    District: str
    City: str

def map_to_house_data(prop: Properties) -> HouseData:
    return HouseData(
        Area=prop.area,
        Frontage=prop.frontage,
        Access_Road=prop.access_road,
        Floors=prop.floors,
        Bedrooms=prop.bedrooms,
        Bathroom=prop.bathroom,
        House_direction=prop.house_direction,
        Balcony_direction=prop.balcony_direction,
        Legal_status=prop.legal_status,
        Furniture=prop.furniture,
        District=prop.district,
        City=prop.city
    )

@app.get("/health")
def health():
    return {"status": "ok"}


# --------- API dự đoán giá ---------
@app.post("/predict-by-post/{post_id}")
def predict_by_post_id(
    post_id: int,
    mode: str = "stack",
    w: float = 0.3,
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    prop = db.query(Properties).filter(Properties.post_id == post_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Properties not found")

    # Validate minimal data
    required_fields = [
        prop.area, prop.frontage, prop.access_road,
        prop.bedrooms, prop.bathroom,
        prop.city, prop.district
    ]
    if any(v is None for v in required_fields):
        raise HTTPException(
            status_code=400,
            detail="Incomplete property data for prediction"
        )

    house_data = map_to_house_data(prop)

    df = pd.DataFrame([house_data.dict()])
    pred = predict_pipeline(
        df,
        preprocess,
        dnn,
        xgb_model,
        meta,
        mode=mode,
        w=w
    )

    return {
        "post_id": post_id,
        "predicted_price": float(pred[0]),
        "mode": mode
    }


# --------- API phân loại ảnh BĐS / spam ---------
@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File upload phải là ảnh (image/*).")

    image_bytes = await file.read()

    result = predict_image_bytes(
        image_bytes=image_bytes,
        model=image_model,
        class_names=image_class_names,
        transform=image_transform,
    )

    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
