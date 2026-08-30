import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart } from "../../components/ui/BarChart";

const data = [
  { day: "א", value: 47 },
  { day: "ב", value: 34 },
  { day: "ג", value: 58 },
  { day: "ד", value: 43 },
  { day: "ה", value: 76 },
  { day: "ו", value: 34 },
];

const meta = {
  title: "Atoms/BarChart",
  component: BarChart,
  args: {
    data,
    tone: "warning",
    label: "מכירות מצטברות לפי יום",
  },
  argTypes: {
    tone: { control: "select", options: ["warning", "danger", "success"] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280, height: 100 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: { tone: "warning" },
};

export const Success: Story = {
  args: { tone: "success" },
};

export const Danger: Story = {
  args: { tone: "danger" },
};
