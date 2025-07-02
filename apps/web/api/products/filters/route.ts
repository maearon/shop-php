import { type NextRequest, NextResponse } from "next/server"

const RUBY_API_URL = "https://ruby-rails-boilerplate-3s9t.onrender.com"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    // Forward request to Ruby API
    const apiUrl = `${RUBY_API_URL}/api/products/filters?${searchParams.toString()}`

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
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching filters:", error)

    // Return mock filter data as fallback
    return NextResponse.json({
      gender: [
        { value: "men", label: "Men", count: 126 },
        { value: "women", label: "Women", count: 128 },
        { value: "unisex", label: "Unisex", count: 116 },
        { value: "kids", label: "Kids", count: 58 },
      ],
      category: [
        { value: "shoes", label: "Shoes", count: 126 },
        { value: "clothing", label: "Clothing", count: 314 },
        { value: "accessories", label: "Accessories", count: 54 },
      ],
      size: [
        { value: "7", label: "7", count: 15 },
        { value: "8", label: "8", count: 20 },
        { value: "9", label: "9", count: 25 },
        { value: "10", label: "10", count: 22 },
        { value: "11", label: "11", count: 18 },
      ],
      color: [
        { value: "black", label: "Black", count: 45 },
        { value: "white", label: "White", count: 38 },
        { value: "blue", label: "Blue", count: 22 },
        { value: "red", label: "Red", count: 15 },
      ],
      price_range: {
        min: 65,
        max: 300,
      },
    })
  }
}
