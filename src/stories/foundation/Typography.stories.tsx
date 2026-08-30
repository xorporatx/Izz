import type { Meta, StoryObj } from "@storybook/react-vite";

const sizes = [
  { name: "--text-xs / --leading-xs", size: 12, leading: 16 },
  { name: "--text-sm / --leading-sm", size: 14, leading: 20 },
  { name: "--text-xl / --leading-xl", size: 20, leading: 28 },
];

const weights = [
  { name: "--weight-regular", value: 400 },
  { name: "--weight-medium", value: 500 },
  { name: "--weight-semibold", value: 600 },
  { name: "--weight-bold", value: 700 },
];

const SAMPLE = "ג׳פניקה סניף אריאל · לוח בקרה";

function TypeScale() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>
          Size / line-height
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sizes.map((s) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                borderBottom: "1px solid #e5e5e5",
                paddingBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "#737373",
                  width: 220,
                  flex: "none",
                }}
              >
                {s.name}
              </span>
              <span style={{ fontSize: s.size, lineHeight: `${s.leading}px` }}>
                {SAMPLE}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>
          Weight
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {weights.map((w) => (
            <div
              key={w.name}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                borderBottom: "1px solid #e5e5e5",
                paddingBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "#737373",
                  width: 220,
                  flex: "none",
                }}
              >
                {w.name} ({w.value})
              </span>
              <span style={{ fontSize: 18, fontWeight: w.value }}>
                {SAMPLE}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>
          Tracking
        </h3>
        <p style={{ fontSize: 12, color: "#737373", margin: "0 0 12px" }}>
          --tracking-tight: -0.24px · --tracking-tighter: -0.4px (used on
          large headings only — not visible at body sizes)
        </p>
      </section>
    </div>
  );
}

const meta = {
  title: "Foundation/Typography",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const TypeScale_: Story = {
  name: "Type scale",
  render: () => <TypeScale />,
};
