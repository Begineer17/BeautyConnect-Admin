import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">BeautyConnect</span>
            </div>
            <p className="text-gray-400">Nền tảng kết nối dịch vụ làm đẹp hàng đầu Việt Nam</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Dịch vụ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/listing?service=nail" className="hover:text-white">
                  Nail
                </Link>
              </li>
              <li>
                <Link href="/listing?service=hair" className="hover:text-white">
                  Hair
                </Link>
              </li>
              <li>
                <Link href="/listing?service=spa" className="hover:text-white">
                  Spa
                </Link>
              </li>
              <li>
                <Link href="/listing?service=makeup" className="hover:text-white">
                  Makeup
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services" className="hover:text-white">
                  Dịch vụ hỗ trợ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Điều khoản
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Bảo mật
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Kết nối</h3>
            <div className="flex space-x-4">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-400 hover:text-white hover:border-white bg-transparent"
              >
                Facebook
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-400 hover:text-white hover:border-white bg-transparent"
              >
                Zalo
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BeautyConnect. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
