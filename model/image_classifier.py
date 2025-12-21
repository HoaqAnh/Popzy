# image_classifier.py

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image, UnidentifiedImageError
import cv2
import numpy as np
from io import BytesIO

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
CHECKPOINT = "predictImage/realestate_resnet50_best.pth"  # đường dẫn tới file .pth của bạn


def create_model(num_classes: int):
    model = models.resnet50(weights=models.ResNet50_Weights.IMAGENET1K_V2)
    in_features = model.fc.in_features
    model.fc = nn.Linear(in_features, num_classes)
    return model


def load_image_model():
    """
    Load model CNN + class_names + transform
    Gọi 1 lần khi server khởi động.
    """
    ckpt = torch.load(CHECKPOINT, map_location=DEVICE)
    class_names = ckpt["class_names"]

    model = create_model(num_classes=len(class_names))
    model.load_state_dict(ckpt["model_state_dict"])
    model.to(DEVICE)
    model.eval()

    input_size = 224
    transform = transforms.Compose([
        transforms.Resize((input_size, input_size)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        ),
    ])

    return model, class_names, transform


def laplacian_variance(cv2_img):
    gray = cv2.cvtColor(cv2_img, cv2.COLOR_BGR2GRAY)
    return cv2.Laplacian(gray, cv2.CV_64F).var()


def predict_image_bytes(image_bytes: bytes, model, class_names, transform):
    """
    image_bytes: raw bytes (UploadFile.read())
    Trả về: dict {label, probability, is_valid, reason, width, height, sharpness}
    """

    # convert bytes -> np -> cv2 image
    nparr = np.frombuffer(image_bytes, np.uint8)
    cv2_img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if cv2_img is None:
        return {
            "label": "spam",
            "probability": 1.0,
            "is_valid": False,
            "reason": "invalid_image",
            "width": None,
            "height": None,
            "sharpness": None,
        }

    h, w = cv2_img.shape[:2]
    sharp = laplacian_variance(cv2_img)

    # rule kiểm tra kích thước
    if w < 600 or h < 400:
        return {
            "label": "spam",
            "probability": 1.0,
            "is_valid": False,
            "reason": "too_small",
            "width": w,
            "height": h,
            "sharpness": sharp,
        }

    # rule kiểm tra độ mờ
    if sharp < 50:  # threshold bạn có thể chỉnh
        return {
            "label": "spam",
            "probability": 1.0,
            "is_valid": False,
            "reason": "too_blurry",
            "width": w,
            "height": h,
            "sharpness": sharp,
        }

    # chuyển sang PIL cho torchvision
    img_rgb = cv2.cvtColor(cv2_img, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(img_rgb)

    input_tensor = transform(pil_img).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)[0]
        prob_val, pred_idx = torch.max(probs, dim=0)

    label = class_names[pred_idx.item()]
    prob = float(prob_val.item())

    # logic quyết định hợp lệ / spam
    is_valid = True
    reason = "ok"

    if label == "spam" and prob > 0.6:
        is_valid = False
        reason = "spam"
    elif prob < 0.4:
        # model không tự tin -> treat như spam
        label = "spam"
        is_valid = False
        reason = "low_confidence"

    return {
        "label": label,
        "probability": prob,
        "is_valid": is_valid,
        "reason": reason,
        "width": w,
        "height": h,
        "sharpness": sharp,
    }
