"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { HelpCircle } from "lucide-react"
import Link from "next/link"

export default function SupportButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent">
          <HelpCircle className="w-4 h-4 mr-2" />
          Hỗ trợ dịch vụ
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/services/spa-owners">Dành cho chủ Spa</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/services/salon-owners">Dành cho chủ Salon</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/services/freelancers">Dành cho Freelancer</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/contact">Liên hệ hỗ trợ</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
