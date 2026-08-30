import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "../../components/ui/Logo";

const meta = {
  title: "Atoms/Logo",
  component: Logo,
  args: { size: 36 },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: { size: 64 },
};
