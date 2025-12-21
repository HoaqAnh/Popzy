import { useQuery } from "@tanstack/react-query";
import { modelService } from "../services/modelService";

export const usePredictPrice = (postId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["predict-price", postId],

    queryFn: async () => {
      const response = await modelService.predictByPostId(postId);
      
      const priceInBillions = response.data.predicted_price;
      return priceInBillions * 1_000_000_000;
    },

    enabled: !!postId,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  return {
    predictedPrice: data || null,
    isLoading,
    error: error ? (error as Error).message : null,
  };
};