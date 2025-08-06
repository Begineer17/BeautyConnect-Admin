import React from 'react'
import Image from "next/image"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Camera } from "lucide-react"

const GalaryTab = ({ gallery } : { gallery: string[] }) => {
  return (
    <Card className="border-pink-100">
              <CardHeader>
                <h2 className="text-2xl font-bold text-gray-800">Thư viện ảnh</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.map((image, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <Image
                        src={image || "/placeholder.jpg"}
                        alt={`Gallery image ${index + 1}`}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
  )
}

export default GalaryTab