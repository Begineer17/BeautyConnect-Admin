import React from 'react'
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
const CTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
            <Button
              size="lg"
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Tìm Spa Gần Bạn
            </Button>
          </div>
    
  )
}

export default CTA