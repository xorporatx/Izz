import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as Icons from "../../components/icons";

type IconComponent = (props: { size?: number; className?: string }) => ReactElement;

const iconEntries = Object.entries(Icons) as [string, IconComponent][];

function IconGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 16,
      }}
    >
      {iconEntries.map(([name, Icon]) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: 16,
            border: "1px solid #e5e5e5",
            borderRadius: 12,
          }}
        >
          <Icon size={22} />
          <span style={{ fontSize: 11, fontFamily: "monospace" }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundation/Icons",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AllIcons: Story = {
  render: () => <IconGrid />,
};
