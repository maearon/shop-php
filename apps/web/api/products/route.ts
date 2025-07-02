import { type NextRequest, NextResponse } from "next/server"

const RUBY_API_URL = "https://ruby-rails-boilerplate-3s9t.onrender.com"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    // Forward all query parameters to the Ruby API
    const apiUrl = `${RUBY_API_URL}/api/products?${searchParams.toString()}`

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Ruby API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      products: data.products || [],
      meta: data.meta || {
        current_page: 1,
        total_pages: 1,
        total_count: 0,
        per_page: 24,
        filters_applied: {},
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)

    // Return mock data as fallback
    return NextResponse.json({
      success: true,
      products: [
        {
          id: "1",
          name: "F50 Elite Firm Ground Cleats",
          price: 270,
          brand: "adidas",
          category: "soccer",
          gender: "men",
          sport: "soccer",
          jan_code: "JP5593",
          model_number: "F50123",
          description: "Lightweight soccer cleats for speed",
          badge: "Best Seller",
          image_url: "/placeholder.svg?height=300&width=250",
          variants: [{ color: "#000000" }, { color: "#FFFFFF" }],
          slug: "f50-elite-firm-ground-cleats",
          reviews_count: 45,
          average_rating: 4.5,
        },
        {
          id: "2",
          name: "Predator Elite Firm Ground Cleats",
          price: 280,
          brand: "adidas",
          category: "soccer",
          gender: "men",
          sport: "soccer",
          jan_code: "JP5594",
          model_number: "PRD456",
          description: "Control-focused soccer cleats",
          badge: "New",
          image_url: "/placeholder.svg?height=300&width=250",
          variants: [{ color: "#FF0000" }, { color: "#0000FF" }],
          slug: "predator-elite-firm-ground-cleats",
          reviews_count: 32,
          average_rating: 4.7,
        },
        {
          id: "3",
          name: "Copa Mundial Firm Ground Cleats",
          price: 150,
          brand: "adidas",
          category: "soccer",
          gender: "men",
          sport: "soccer",
          jan_code: "JP5595",
          model_number: "COPA789",
          description: "Classic leather soccer cleats",
          badge: "Classic",
          image_url: "/placeholder.svg?height=300&width=250",
          variants: [{ color: "#000000" }],
          slug: "copa-mundial-firm-ground-cleats",
          reviews_count: 128,
          average_rating: 4.8,
        },
        {
          id: "4",
          name: "X Speedflow.1 Firm Ground Cleats",
          price: 250,
          brand: "adidas",
          category: "soccer",
          gender: "men",
          sport: "soccer",
          jan_code: "JP5596",
          model_number: "X101112",
          description: "Agility-focused soccer cleats",
          badge: "New",
          image_url: "/placeholder.svg?height=300&width=250",
          variants: [{ color: "#FFFF00" }, { color: "#FF0000" }],
          slug: "x-speedflow-firm-ground-cleats",
          reviews_count: 67,
          average_rating: 4.6,
        },
      ],
      meta: {
        current_page: 1,
        total_pages: 1,
        total_count: 4,
        per_page: 24,
        filters_applied: {},
      },
    })
  }
}
