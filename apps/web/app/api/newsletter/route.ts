import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email không hợp lệ" }, { status: 400 })
    }

    // Trong thực tế, bạn sẽ lưu email vào database hoặc gửi đến dịch vụ email marketing
    console.log(`Đăng ký newsletter: ${email}`)

    // Giả lập thời gian xử lý
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: "Đăng ký nhận tin thành công!",
    })
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json({ error: "Đã xảy ra lỗi khi đăng ký" }, { status: 500 })
  }
}
