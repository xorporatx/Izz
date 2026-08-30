import type { Meta, StoryObj } from "@storybook/react-vite";
import { BackButton } from "../../components/ui/BackButton";

const meta = {
  title: "Atoms/BackButton",
  component: BackButton,
  args: { onClick: () => {} },
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
