import type { Meta, StoryObj } from "@storybook/react-vite";

const radii = [
  { name: "--radius-md", value: "8px" },
  { name: "--radius-xl", value: "14px" },
  { name: "--radius-card", value: "26px" },
  { name: "--radius-full", value: "9999px" },
];

const shadows = [
  { name: "--shadow-xs", value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
  {
    name: "--shadow-sm",
    value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  },
  {
    name: "--shadow-hover",
    value: "0 6px 16px -6px rgb(38 38 38 / 0.12), 0 2px 6px -2px rgb(38 38 38 / 0.06)",
  },
  { name: "--shadow-nav", value: "0 -6px 24px -8px rgb(38 38 38 / 0.12)" },
];

function RadiusAndShadow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>
          Radius
        </h3>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {radii.map((r) => (
            <div key={r.name} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 88,
                  height: 88,
                  background: "#faf8f2",
                  border: "1px solid #e5e5e5",
                  borderRadius: r.value,
                }}
              />
              <div style={{ marginTop: 8, fontSize: 11, fontFamily: "monospace" }}>
                {r.name}
              </div>
              <div style={{ fontSize: 11, color: "#737373" }}>{r.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>
          Elevation
        </h3>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {shadows.map((s) => (
            <div key={s.name} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 140,
                  height: 88,
                  background: "#ffffff",
                  borderRadius: 12,
                  boxShadow: s.value,
                }}
              />
              <div style={{ marginTop: 12, fontSize: 11, fontFamily: "monospace" }}>
                {s.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundation/Radius & Shadow",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AllTokens: Story = {
  render: () => <RadiusAndShadow />,
};
