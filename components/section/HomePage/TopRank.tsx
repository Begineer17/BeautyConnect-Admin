"use client"

import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Phone, MessageCircle, TrendingUp, Award } from "lucide-react"
import { useTopSalon } from "@/hooks/use-top-salon"
import {ServiceCategories} from "@/types/constants"
const TopRank = () => {
  const { featuredSpas, fetchFeaturedSpas } = useTopSalon();
  React.useEffect(() => {
    fetchFeaturedSpas();
  }, []);
  return (
    
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <TrendingUp className="w-8 h-8 text-pink-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Top Spa Được Yêu Thích</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSpas.map((spa, index) => (
              <Card
                key={spa.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-pink-100 group"
              >
                <div className="relative">
                  <Image
                    src={spa.image || "/placeholder.jpg"}
                    alt={spa.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Image
                      src={spa.logo || "/placeholder_2.jpg"}
                      alt={`${spa.name} logo`}
                      width={60}
                      height={60}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                    />
                  </div>
                  {spa.promotion && (
                    <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">{spa.promotion}</Badge>
                  )}
                  <div className="absolute -bottom-4 left-4">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 text-sm font-bold">
                      #{index+1} Top Ranked
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{spa.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{spa.rating}</span>
                      <span className="text-sm text-gray-500">({spa.reviews})</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{spa.address}</span>
                  </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                    {spa.tag.map((serviceId: string, index: number) => {
                      const category = ServiceCategories.find(cat => cat.id === serviceId);
                      return (
                      <Badge key={index} variant="secondary" className="bg-pink-100 text-pink-700">
                        {category ? category.name : serviceId}
                      </Badge>
                      );
                    })}
                    </div>

                  <div className="text-sm text-gray-600 mb-4">
                    Giá: <span className="font-semibold text-pink-600">{spa.price}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Zalo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Gọi
                    </Button>
                    <Link href={`/spa/${spa.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                      >
                        Chi tiết
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/ranking">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                <Award className="w-5 h-5 mr-2" />
                Xem bảng xếp hạng
              </Button>
            </Link>
          </div>
        </div>
      </section>

  )
}

export default TopRank