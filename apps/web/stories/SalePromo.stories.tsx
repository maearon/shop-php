import type { Meta, StoryObj } from "@storybook/nextjs"
import SalePromo from "@/components/sale-promo"

const meta: Meta<typeof SalePromo> = {
  title: "Components/SalePromo",
  component: SalePromo,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof SalePromo>

export const UsesDefaultColors: Story = {
  args: {
    message: "UP TO 40% OFF",
    // không truyền bgColor hay textColor để dùng mặc định
  },
}
