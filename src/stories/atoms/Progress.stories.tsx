import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../../components/ui/Progress";

const meta = {
  title: "Atoms/Progress",
  component: Progress,
  args: {
    value: 84,
    tone: "warning",
    label: "התקדמות יעד הכנסות חודשי",
  },
  argTypes: {
    tone: { control: "select", options: ["warning", "danger", "success"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: { tone: "warning", value: 84 },
};

export const Success: Story = {
  args: { tone: "success", value: 94 },
};

export const Danger: Story = {
  args: { tone: "danger", value: 22 },
};
