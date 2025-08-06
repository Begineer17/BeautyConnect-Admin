import { getReviewsBySpaId } from "@/lib/fetchReview";
import { Review } from "@/types/review";
import { useState, useEffect } from "react";


export function useReview(spaId: string) {
  const [countReviews, setCountReviews] = useState<number>(0);
  const [reviews, setData] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
      if (!spaId) return;
      const fetchReviewBySpaId = async () => {
        try {
          const res = await getReviewsBySpaId(spaId);
          setData(res.reviews);
          setCountReviews(res.count);
        } catch (err: any) {
          setError(err?.message || "Lỗi khi tải dịch vụ");
        } finally {
          setIsLoading(false);
        }
      };
      fetchReviewBySpaId();
    }, [spaId]);

  return {
    countReviews: countReviews,
    reviews: reviews,
    isLoading,
    isError: error,
  };
}

