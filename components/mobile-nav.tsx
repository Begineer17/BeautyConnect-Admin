"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Search, Gift, Award, HelpCircle, Menu, X } from "lucide-react"
import Link from "next/link"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: Home, label: "Trang chủ", href: "/" },
    { icon: Search, label: "Tìm kiếm", href: "/listing" },
    { icon: Award, label: "Xếp hạng", href: "/ranking" },
    { icon: Gift, label: "Ưu đãi", href: "/promotions" },
    { icon: HelpCircle, label: "Hỗ trợ", href: "/services" },
  ]

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 z-50 md:hidden">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Button
                variant="ghost"
                className="h-full w-full flex flex-col items-center justify-center space-y-1 rounded-none hover:bg-pink-50"
              >
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="text-xs text-gray-600">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)}>
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-pink-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <Link key={index} href={item.href} onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start space-x-3 hover:bg-pink-50">
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
