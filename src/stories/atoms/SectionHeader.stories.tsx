import type { Meta, StoryObj } from "@storybook/react-vite";
import { SectionHeader } from "../../components/ui/SectionHeader";

const meta = {
  title: "Atoms/SectionHeader",
  component: SectionHeader,
  args: { title: "תובנות" },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    title: "פירוט עובדים",
    action: <button type="button">הצג הכל</button>,
  },
};
