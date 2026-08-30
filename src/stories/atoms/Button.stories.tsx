import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../components/ui/Button";
import { Plus } from "../../components/icons";

const meta = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "שמור",
    variant: "primary",
    block: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "הצג פרטים" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "בטל" },
};

export const WithIcon: Story = {
  args: { icon: <Plus size={16} />, children: "הוסף מחלקה" },
};

export const Block: Story = {
  args: { block: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
