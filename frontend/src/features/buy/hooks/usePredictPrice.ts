import { useState, useEffect } from "react";
import { modelService } from "../services/modelService";

export const usePredictPrice = (postId: number) => {
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPrediction = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await modelService.predictByPostId(postId);
        const priceInBillions = response.data.predicted_price;
        const priceInVND = priceInBillions * 1_000_000_000;
        
        setPredictedPrice(priceInVND);
      } catch (err) {
        console.error("Lỗi khi dự đoán giá:", err);
        setError("Không thể lấy dữ liệu dự báo");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrediction();
  }, [postId]);

  return { predictedPrice, isLoading, error };
};