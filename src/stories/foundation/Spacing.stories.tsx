import type { Meta, StoryObj } from "@storybook/react-vite";

const spacing = [
  { name: "--space-0-5", value: 2 },
  { name: "--space-1", value: 4 },
  { name: "--space-2", value: 8 },
  { name: "--space-3", value: 12 },
  { name: "--space-4", value: 16 },
  { name: "--space-5", value: 20 },
  { name: "--space-6", value: 24 },
  { name: "--space-8", value: 32 },
  { name: "--space-10", value: 40 },
  { name: "--space-12", value: 48 },
];

function SpacingScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {spacing.map((s) => (
        <div
          key={s.name}
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <span
            style={{
              fontSize: 12,
              fontFamily: "monospace",
              color: "#737373",
              width: 140,
              flex: "none",
            }}
          >
            {s.name}
          </span>
          <span style={{ fontSize: 12, width: 40, flex: "none" }}>
            {s.value}px
          </span>
          <div
            style={{
              width: s.value,
              height: 20,
              background: "#064e3b",
              borderRadius: 2,
            }}
          />
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundation/Spacing",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => <SpacingScale />,
};
