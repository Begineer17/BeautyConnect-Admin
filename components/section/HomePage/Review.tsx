"use client"

import React, { useEffect } from 'react'
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import {useReview} from "@/hooks/use-review"

const Review = () => {

  const { reviews, isLoading, refetch, isError } = useReview("3");

  useEffect(() => {
    refetch();
    if (isError) {
      console.error("Error fetching reviews:", isError);
    }
    // fetchReviews();
  }, []);



  return (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Khách hàng nói gì</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-pink-100">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-600">Dịch vụ: {review.service}</p>
                      <p className="text-sm text-gray-600">Tại: {review.salonName}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

  )
}

export default Review