import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useReview } from '@/hooks/use-review'
const ReviewTab = ({ spa }: { spa: any }) => {
  const { reviews, fetchCommentsBySpaId } = useReview(null);
  React.useEffect(() => {
    if (spa?.spaId) {
      fetchCommentsBySpaId(spa.spaId);
    }
  }, [spa?.spaId]);
  return (
    <Card className="border-pink-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Đánh giá khách hàng</h2>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">{spa.rating}</div>
            <div className="flex justify-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(spa.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">{spa.total_reviews} đánh giá</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.jpg"} alt={review.name} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.name}</h4>
                      <p className="text-sm text-gray-500">
                        {review.createdAt} • {review.service}
                      </p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  {Array.isArray(review.images) && review.images.length > 0 && (
                    <div className="flex space-x-2">
                      {review.images.map((image: string, index: number) => (
                        <Image
                          key={index}
                          src={image || "/placeholder.jpg"}
                          alt={`Review image ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent">
            Xem thêm đánh giá
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReviewTab