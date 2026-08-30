import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../../components/ui/Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  args: {
    tone: "warning",
    children: "חדש",
  },
  argTypes: {
    tone: { control: "select", options: ["warning", "danger", "success"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: { tone: "warning", children: "עדיפות בינונית" },
};

export const Danger: Story = {
  args: { tone: "danger", children: "עדיפות גבוהה" },
};

export const Success: Story = {
  args: { tone: "success", children: "חדש" },
};
