import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Sparkles, Scissors, Palette, Heart, Users, Award } from 'lucide-react'

const Categories = () => {

  const categories = [
      { icon: Sparkles, name: "Nail tại nhà", color: "bg-pink-100 text-pink-600" },
      { icon: Scissors, name: "Salon cao cấp", color: "bg-purple-100 text-purple-600" },
      { icon: Palette, name: "Makeup dạ tiệc", color: "bg-rose-100 text-rose-600" },
      { icon: Heart, name: "Spa thư giãn", color: "bg-indigo-100 text-indigo-600" },
      { icon: Users, name: "Massage đôi", color: "bg-teal-100 text-teal-600" },
      { icon: Award, name: "Chăm sóc da", color: "bg-amber-100 text-amber-600" },
  ]

  return (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Danh mục nổi bật</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href="/listing" className="group">
                <Card className="text-center hover:shadow-lg transition-all duration-300 border-pink-100 group-hover:border-pink-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Categories