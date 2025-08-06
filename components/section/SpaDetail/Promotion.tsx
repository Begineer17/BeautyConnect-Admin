import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { usePromotion } from '@/hooks/use-promotion'

const PromotionTab = ({ salonId }: { salonId: string | "Spa ID is null" }) => {
  const { promotions, isLoading, error, refetch } = usePromotion(salonId);
  React.useEffect(() => {
    refetch();
  }, []);
  if (isLoading) {
    return <div>Loading promotions...</div>;
  }
  if (error) {
    return <div>Error loading promotions: {error}</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {promotions.map((promotion, index) => (
        <Card
          key={index}
          className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50"
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {promotion.title}
                </h3>
                <p className="text-gray-600 mb-3">{promotion.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant="secondary" className="bg-red-100 text-red-700">
                      Mã: {promotion.code}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      HSD: {promotion.validUntil}
                    </p>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600">
                    Sử dụng ngay
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default PromotionTab