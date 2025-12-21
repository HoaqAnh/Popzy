import axios from "axios";

const MODEL_API_URL = import.meta.env.VITE_MODEL_API_URL;

const modelClient = axios.create({
  baseURL: MODEL_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PredictResponse {
  post_id: number;
  predicted_price: number;
  mode: string;
}

export const modelService = {
  predictByPostId(postId: number) {
    return modelClient.post<PredictResponse>(`/predict-by-post/${postId}`);
  },
};