import type { Meta, StoryObj } from "@storybook/nextjs"
import PromoCarousel, { Slide } from "@/components/promo-carousel"

const meta: Meta<typeof PromoCarousel> = {
  title: "Components/PromoCarousel",
  component: PromoCarousel,
  parameters: {
    layout: "fullscreen",
  },
}
export default meta

type Story = StoryObj<typeof PromoCarousel>

// ✅ Fake slide data
const mockSlides: Slide[] = [
  {
    id: 1,
    title: "PAST, PRESENT, FUTURE",
    description: "Explore the Superstar in all its iconic glory, now with more comfort.",
    image: "https://via.placeholder.com/600x400?text=Superstar",
    cta: "SHOP NOW",
    href: "/superstar",
  },
  {
    id: 2,
    title: "DROPSET 3",
    description: "Rooted in Strength.",
    image: "https://via.placeholder.com/600x400?text=Dropset",
    cta: "SHOP NOW",
    href: "/dropset",
  },
  {
    id: 3,
    title: "A TRUE MIAMI ORIGINAL",
    description: "Rep the Magic City during every match in this signature blue jersey.",
    image: "https://via.placeholder.com/600x400?text=Miami",
    cta: "SHOP NOW",
    href: "/miami",
  },
  {
    id: 4,
    title: "SAMBA",
    description: "Always iconic, always in style.",
    image: "https://via.placeholder.com/600x400?text=Samba",
    cta: "SHOP NOW",
    href: "/samba",
  },
]

export const Default: Story = {
  args: {
    slides: mockSlides,
  },
}

export const OneSlideOnly: Story = {
  args: {
    slides: [mockSlides[0]],
  },
}

export const ManySlides: Story = {
  args: {
    slides: [...mockSlides, ...mockSlides, ...mockSlides],
  },
}
