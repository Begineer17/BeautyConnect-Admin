import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function Hero() {
    return (
        <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Kết nối vẻ đẹp
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Chọn đúng nơi, đẹp đúng cách. Tìm kiếm Spa, Salon và Beauty Artist uy tín gần bạn
            </p>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-pink-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Tìm dịch vụ làm đẹp..."
                    className="pl-10 h-12 border-pink-200 focus:border-pink-400"
                  />
                </div>
                <Select>
                  <SelectTrigger className="h-12 border-pink-200">
                    <SelectValue placeholder="Khu vực" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1">Quận 1</SelectItem>
                    <SelectItem value="q3">Quận 3</SelectItem>
                    <SelectItem value="q5">Quận 5</SelectItem>
                    <SelectItem value="q7">Quận 7</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="h-12 border-pink-200">
                    <SelectValue placeholder="Dịch vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nail">Nail</SelectItem>
                    <SelectItem value="hair">Hair</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                    <SelectItem value="makeup">Makeup</SelectItem>
                    <SelectItem value="massage">Massage</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <Search className="w-5 h-5 mr-2" />
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}