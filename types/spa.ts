import { Service } from "./service"
import { Promotion } from "./promotion"
import { Review } from "./review"

export type rawSpaDetails = {
  email: string
  isVerified: boolean
  rating?: number
  reviewCount?: number
  profile:{
    address: string
    createdAt: string
    description: string
    id: string
    name: string
    openTime: string
    phone: string
    portfolio: string[]
    priceRange: string
    salonId: string
    tag: string[]
    totalStaff: number
  }
  images: string[]
  gallery: string[]
}

export type spaDetails = {
  id: string
  spaId?: string | "Spa ID is null"
  logo: string
  name: string
  description: string
  address: string
  rating: number
  total_reviews: number
  is_premium: boolean
  images: string[]
  gallery: string[]
  hours: {
    "Thứ 2 - Thứ 6": string
    "Thứ 7 - Chủ nhật": string
    [key: string]: string // for flexibility if you want to add more keys
  }
}


export type rawfeaturedSpa={
  id: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  portfolio: string;
  priceRange: string;
  opentime: string;
  totalStaff: number;
  Salon: {
    rating: number;
    reviewsCount: number;
  }
}

export type featuredSpa = {
  id: string
  name: string
  image: string
  logo: string
  price: string
  rating: number
  reviews: number
  address: string
  tag: string[]  
  rank: number
  promotion?: string
}
