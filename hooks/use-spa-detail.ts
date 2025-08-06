"use client"

import { useEffect, useState } from "react"
import { spaDetails } from "@/types/spa"
import { Promotion } from "@/types/promotion"
import { Service } from "@/types/service"
import { Review } from "@/types/review"
import { getSalonDetails } from "@/lib/spaDetails"

export function useSpaDetail(spaId: string) {
  const [spa, setSpa] = useState<spaDetails | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (spaId) {
      fetchSpaDetail()
    }
  }, [spa?.spaId])

  const fetchSpaDetail = async () => {
    setLoading(true);
    try {
      const spaDetails = await getSalonDetails(spaId);
      if (spaDetails) {
        setSpa(spaDetails);
      } else {
        setError("Spa Details Error!!!");
      }
    } catch (e) {
      setError("Spa Details Error!!!");
    }
    setLoading(false);
  };

  
  return {
    spa,
    services,
    promotions,
    loading,
    error,
    refetch: fetchSpaDetail,
  }
}
