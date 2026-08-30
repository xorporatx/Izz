import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../../components/ui/Card";

const meta = {
  title: "Atoms/Card",
  component: Card,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 360, padding: 20 }}>
      <p style={{ margin: 0, fontWeight: 600 }}>יעד הכנסות חודשי</p>
      <p style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 600 }}>
        ₪420,000
      </p>
      <p style={{ margin: "4px 0 0", fontSize: 12, color: "#737373" }}>
        מתוך ₪500,000
      </p>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card
      as="button"
      type="button"
      interactive
      style={{ maxWidth: 360, padding: 20, textAlign: "right", width: "100%" }}
    >
      <p style={{ margin: 0, fontWeight: 600 }}>משלוחים</p>
      <p style={{ margin: "4px 0 0", fontSize: 12, color: "#737373" }}>
        לוגיסטיקה · זאיד גואד
      </p>
    </Card>
  ),
};
