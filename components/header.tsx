import Link from "next/link"
import { Sparkles } from "lucide-react"
import SupportButton from "@/components/support-button"

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              BeautyConnect
            </span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors">
              Trang chủ
            </Link>
            <Link href="/listing" className="text-gray-700 hover:text-pink-600 transition-colors">
              Tìm Spa
            </Link>
            <Link href="/ranking" className="text-gray-700 hover:text-pink-600 transition-colors">
              Xếp hạng
            </Link>
            <Link href="/promotions" className="text-gray-700 hover:text-pink-600 transition-colors">
              Ưu đãi
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-pink-600 transition-colors">
              Blog
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <SupportButton />
          </div>
        </div>
      </div>
    </header>
  )
}
