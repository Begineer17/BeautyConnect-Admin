export interface Service {
  id: string
  salonId: string
  name: string
  category: string[]
  description: string
  originalPrice: string
  currentPrice: string
  duration: string
  isHome: boolean
  illustrationImage: string
  rating: string
  reviewCount: string
  createdAt: string
};

export interface UpdateServiceInput {
  serviceId: string
  name: string
  description: string
  originalPrice: string
  currentPrice: string
  duration: string
  isHome: boolean
  imageFile?: File
}

export interface CreateServiceInput extends UpdateServiceInput {
  category: string[]
}