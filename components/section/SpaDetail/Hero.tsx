import React from 'react'
import { spaDetails } from '@/types/spa'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Heart, Share2, Camera, Play, Star, MapPin, Clock, MessageCircle, Phone, Calendar, Globe } from 'lucide-react'
import { Service } from '@/types/service'
import { Review } from '@/types/review'
const Hero = ({ spa }: { spa: spaDetails }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src={"/placeholder.jpg"}
                // src={spa.images ? spa.images[0] : "/placeholder.jpg"}
                alt={spa.name}
                width={600}
                height={400}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
                  <Heart className="w-4 h-4 mr-1" />
                  Yêu thích
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Chia sẻ
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white">
                  <Camera className="w-4 h-4 mr-1" />
                  {spa.gallery.length} ảnh
                </Button>
                <Button size="sm" className="bg-black/50 hover:bg-black/70 text-white">
                  <Play className="w-4 h-4 mr-1" />
                  Video
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {spa.images.slice(1, 4).map((image: string, index: number) => (
                <Image
                  key={index}
                  src={image || "/placeholder.jpg"}
                  alt={`${spa.name} ${index + 2}`}
                  width={150}
                  height={100}
                  className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
              <div className="relative">
                <Image
                  src={spa.images[3] || "/placeholder_2.jpg"}
                  alt={`${spa.name} more`}
                  width={150}
                  height={100}
                  className="w-full h-20 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
                  <span className="text-white font-semibold">+{spa.gallery.length - 4}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-pink-200 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <Image
                    src={spa.logo || "/placeholder.jpg"}
                    alt={`${spa.name} logo`}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full border-4 border-pink-200"
                  />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{spa.name}</h1>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(spa.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-lg">{spa.rating}</span>
                  <span className="text-gray-500">({spa.total_reviews} đánh giá)</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-pink-500" />
                  <span className="text-sm">{spa.address}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-pink-500" />
                  <div className="text-sm">
                    <div>T2-T6: {spa.hours["Thứ 2 - Thứ 6"]}</div>
                    <div>T7-CN: {spa.hours["Thứ 7 - Chủ nhật"]}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Zalo
                  </Button>
                  <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi ngay
                  </Button>
                </div>

                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Đặt lịch ngay
                </Button>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 border-gray-300 bg-transparent">
                    <Globe className="w-4 h-4 mr-1" />
                    Website
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-blue-300 text-blue-600 bg-transparent">
                    Facebook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  )
}

export default Hero