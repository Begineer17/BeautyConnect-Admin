import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Scissors, Palette } from "lucide-react"
import Link from "next/link"


const Support = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Dịch vụ hỗ trợ</h2>
          <p className="text-xl mb-8 opacity-90">Chúng tôi cung cấp các dịch vụ hỗ trợ cho Spa, Salon và Freelancer</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/services/spa-owners">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Dành cho chủ Spa</h3>
                  <p className="text-white/80">Giải pháp quản lý, marketing và phát triển khách hàng cho Spa của bạn</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/services/salon-owners">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <Scissors className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Dành cho chủ Salon</h3>
                  <p className="text-white/80">Công cụ đặt lịch, quản lý nhân viên và tăng doanh thu cho Salon</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/services/freelancers">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <Palette className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Dành cho Freelancer</h3>
                  <p className="text-white/80">Xây dựng thương hiệu cá nhân và mở rộng mạng lưới khách hàng</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

  )
}

export default Support