import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import MobileNav from "@/components/mobile-nav"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:8080'),
  title: "BeautyConnect - Nền tảng kết nối dịch vụ làm đẹp hàng đầu Việt Nam",
  description:
    "Tìm kiếm và kết nối với các Spa, Salon và Beauty Artist uy tín gần bạn. Đặt lịch dễ dàng, ưu đãi hấp dẫn.",
  keywords: "spa, salon, beauty, làm đẹp, nail, tóc, massage, makeup, đặt lịch, ưu đãi",
  openGraph: {
    title: "BeautyConnect - Nền tảng kết nối dịch vụ làm đẹp hàng đầu Việt Nam",
    description:
      "Tìm kiếm và kết nối với các Spa, Salon và Beauty Artist uy tín gần bạn. Đặt lịch dễ dàng, ưu đãi hấp dẫn.",
    url: "/",
    siteName: "BeautyConnect",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BeautyConnect - Nền tảng kết nối dịch vụ làm đẹp",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="mdl-js">
      <head>
        <link rel="canonical" href="https://beautyconnect.vn" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "BeautyConnect",
              url: "https://beautyconnect.vn",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://beautyconnect.vn/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${inter.className}`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <MobileNav />
          <SpeedInsights />
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
