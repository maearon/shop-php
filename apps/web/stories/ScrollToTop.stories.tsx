import type { Meta, StoryObj } from "@storybook/nextjs"
import ScrollToTop from "@/components/scroll-to-top"

const meta: Meta<typeof ScrollToTop> = {
  title: "Components/ScrollToTop",
  component: ScrollToTop,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}
export default meta

type Story = StoryObj<typeof ScrollToTop>

export const Default: Story = {
  render: () => (
    <div style={{ height: "2000px", paddingTop: "500px" }}>
      <p style={{ textAlign: "center" }}>Scroll down to see the button</p>
      <ScrollToTop />
    </div>
  ),
}
