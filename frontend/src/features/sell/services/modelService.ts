import axios from "axios";

const API_URL = import.meta.env.VITE_MODEL_API_URL;

export interface AIAnalysisResult {
  label: string;
  probability: number;
  is_valid: boolean;
  reason: string;
  width: number;
  height: number;
  sharpness: number;
}

export const modelService = {
  analyzeImage: async (file: File): Promise<AIAnalysisResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post<AIAnalysisResult>(`${API_URL}analyze-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
