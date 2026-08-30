import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../components/ui/Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  args: {
    placeholder: "0",
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "ג׳פניקה סניף אריאל" },
};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: "" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "לא זמין" },
};

export const Numeric: Story = {
  args: { type: "number", inputMode: "decimal", dir: "ltr", placeholder: "0" },
};
