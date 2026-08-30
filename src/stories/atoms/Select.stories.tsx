import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, type SelectOption } from "../../components/ui/Select";

const options: SelectOption[] = [
  { value: "cash", label: "מזומן" },
  { value: "card", label: "כרטיס אשראי" },
  { value: "transfer", label: "העברה בנקאית" },
  { value: "check", label: "צ׳ק" },
];

function ControlledSelect(props: {
  initialValue?: string;
  disabled?: boolean;
  invalid?: boolean;
  placeholder?: string;
}) {
  const [value, setValue] = useState(props.initialValue ?? "");
  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      disabled={props.disabled}
      invalid={props.invalid}
      placeholder={props.placeholder}
      label="אמצעי תשלום"
    />
  );
}

const meta = {
  title: "Atoms/Select",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <ControlledSelect />,
};

export const WithValue: Story = {
  render: () => <ControlledSelect initialValue="card" />,
};

export const Invalid: Story = {
  render: () => <ControlledSelect invalid />,
};

export const Disabled: Story = {
  render: () => <ControlledSelect disabled initialValue="cash" />,
};
