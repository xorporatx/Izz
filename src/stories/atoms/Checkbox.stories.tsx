import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../../components/ui/Checkbox";

function ControlledCheckbox(props: { initialChecked?: boolean; label: string }) {
  const [checked, setChecked] = useState(props.initialChecked ?? false);
  return <Checkbox checked={checked} onChange={setChecked} label={props.label} />;
}

const meta = {
  title: "Atoms/Checkbox",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Unchecked: Story = {
  render: () => (
    <ControlledCheckbox label="בדוק את רכישות הדגים של 7 הימים האחרונים" />
  ),
};

export const Checked: Story = {
  render: () => (
    <ControlledCheckbox
      initialChecked
      label="סגור את ספירת המלאי של סוף החודש"
    />
  ),
};
