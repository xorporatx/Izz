import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToneDot } from "../../components/ui/ToneDot";

const meta = {
  title: "Atoms/ToneDot",
  component: ToneDot,
  args: { tone: "warning" },
  argTypes: {
    tone: { control: "select", options: ["warning", "danger", "success"] },
  },
} satisfies Meta<typeof ToneDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <ToneDot tone="warning" />
      <ToneDot tone="danger" />
      <ToneDot tone="success" />
    </div>
  ),
};
