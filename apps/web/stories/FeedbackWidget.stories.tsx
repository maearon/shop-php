import type { Meta, StoryObj } from "@storybook/nextjs"
import FeedbackWidget from "@/components/feedback-widget"

const meta: Meta<typeof FeedbackWidget> = {
  title: "Components/FeedbackWidget",
  component: FeedbackWidget,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof FeedbackWidget>

export const Default: Story = {
  render: () => (
    <div style={{ minHeight: "100vh" }}>
      <p className="text-center pt-10">Scroll or interact with the Feedback button on the right</p>
      <FeedbackWidget />
    </div>
  ),
}
