"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"

interface ProductTabsProps {
  description: string
  specifications: string
  reviews?: Array<{
    id: string
    user: string
    rating: number
    comment: string
    date: string
  }>
}

export default function ProductTabs({ description, specifications, reviews = [] }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  const averageRating =
    reviews.length > 0 ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0

  return (
    <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Mô tả</TabsTrigger>
        <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
        <TabsTrigger value="reviews">Đánh giá ({reviews.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{specifications}</p>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        {reviews.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
              <div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="mt-1 text-sm text-gray-600">{reviews.length} đánh giá</div>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{review.user}</div>
                    <div className="text-sm text-gray-600">{review.date}</div>
                  </div>

                  <div className="mt-1 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
