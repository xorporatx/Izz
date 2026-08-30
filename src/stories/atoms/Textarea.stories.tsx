import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../../components/ui/Textarea";

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
  args: {
    placeholder: "הערה נוספת",
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "לא זמין" },
};
