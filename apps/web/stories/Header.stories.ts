import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { fn } from 'storybook/test';

import Header from '@/components/header';
const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true }, // 👈 tắt docs
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
