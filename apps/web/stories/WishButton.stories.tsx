"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
import WishButton from "@/components/wish-button";
import { Provider } from "react-redux";
import { store } from "@/store/store"; // đường dẫn tới store của bạn, chỉnh nếu khác

import { type WishlistItem } from "@/store/wishlistSlice";

const meta: Meta<typeof WishButton> = {
  title: "Components/WishButton",
  component: WishButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div className="p-4">
          <Story />
        </div>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WishButton>;

const mockItem: WishlistItem = {
  id: 10,
  name: "Mock Product",
  price: "100",
  image: "https://via.placeholder.com/150",
  // Thêm các field khác nếu cần theo WishlistItem
};

export const Default: Story = {
  args: {
    item: mockItem,
    size: 24,
  },
};