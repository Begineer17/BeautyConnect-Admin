
import { rawReview, Review } from "@/types/review";
import { featuredSpa } from "../types/spa";
import { spaDetails, rawSpaDetails } from "@/types/spa";
export function normalizeFeaturedSpa(rawData: any): featuredSpa {
  return {
    id: rawData.id,
    name: rawData.name,
    image: rawData.image || "",
    logo: rawData.logo || "",
    price: rawData.priceRange || "0",
    rating: rawData.Salon.rating || 0,
    reviews: rawData.Salon.reviewCount || 0,
    address: rawData.address || "",
    tag: rawData.tag || [],
    rank: rawData.rank || 0,
    promotion: rawData.promotion || undefined,
  };
}

export function normalizeReview(rawDataArray: rawReview): Review {
  return ({
      id: rawDataArray.id,
      name: rawDataArray.userName,
      service: rawDataArray.serviceName,
      salonName: rawDataArray.salonName,
      rating: rawDataArray.rating,
      comment: rawDataArray.comment,
      avatar: rawDataArray.avatar,
      createdAt: rawDataArray.createdAt,
      images: rawDataArray.images || [],
  });
}

export function normalizeSpaDetails(rawData: rawSpaDetails): spaDetails {
  return {
    id: rawData.profile.id,
    logo: rawData.profile.portfolio[0] || "",
    spaId: rawData.profile.salonId,
    name: rawData.profile.name,
    description: rawData.profile.description || "",
    address: rawData.profile.address || "",
    rating: rawData.rating || 0,
    total_reviews: rawData.reviewCount || 0,
    is_premium: rawData.isVerified || false,
    images: rawData.images || [],
    gallery: rawData.gallery || [],
    hours: {
      "Thứ 2 - Thứ 6": rawData.profile.openTime || "08:00 - 17:00",
      "Thứ 7 - Chủ nhật": rawData.profile.openTime || "08:00 - 17:00"
    }
  };
}